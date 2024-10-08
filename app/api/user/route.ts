import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies });

  try {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'No active session' }, { status: 401 });
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) {
      console.error('User error:', userError);
      return NextResponse.json({ error: 'Failed to get user' }, { status: 500 });
    }

    if (!user) {
      console.log('User not found in session');
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Fetch additional user data from your database if needed
    const { data: userData, error: dbError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 });
    }

    return NextResponse.json(userData || user);
  } catch (error) {
    console.error('Unexpected error in user API route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}