'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { RainbowButton } from '@/components/ui/rainbow-button';
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
import { PlaceholdersAndVanishInputRef } from '@/lib/types';
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const router = useRouter();

  const emailInputRef = useRef<PlaceholdersAndVanishInputRef>(null);
  const passwordInputRef = useRef<PlaceholdersAndVanishInputRef>(null);
  const form = useForm();

  const onSubmit = form.handleSubmit(async (values) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      console.error('Error signing in:', error.message);
      // Handle error (e.g., show error message to user)
    } else {
      console.log('Sign in successful:', data);
      // Redirect to home page
      router.push('/');
    }
  });

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] py-12">
      <div className="container max-w-md px-4">
        <div className="flex flex-col gap-4">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full">
            <div className="flex flex-col space-y-1.5 p-6 items-center">
              <h3 className="font-semibold tracking-tight text-xl">Log in with your email</h3>
              <p className="text-sm text-zinc-600">Enter your information to login</p>
            </div>
            <Form {...form}>
              <div className="p-6 pt-0">
                <div className="grid gap-4">
                  <button type="button" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-white hover:bg-zinc-100 hover:text-zinc-900 dark:hover:text-zinc-900 h-10 px-4 py-2 w-full text-black">
                    <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="github" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path d="M1 1h22v22H1z" fill="none"/></svg>
                    Sign up with Google
                  </button>
                  <div className="flex items-center gap-4">
                    <span className="h-px w-full bg-gray-100"></span>
                    <span className="text-xs text-zinc-600">OR</span>
                    <span className="h-px w-full bg-gray-100"></span>
                  </div>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Email
                        </FormLabel>
                        <FormControl>
                          <PlaceholdersAndVanishInput
                            ref={emailInputRef}
                            placeholders={["Enter your email", "example@domain.com", "john.doe@email.com"]}
                            onChange={field.onChange}
                            onSubmit={() => {}}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <div className="flex justify-between">
                          <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Password
                          </FormLabel>
                          <a href="#" className="text-sm underline">Forgot password</a>
                        </div>
                        <FormControl>
                          <PlaceholdersAndVanishInput
                            ref={passwordInputRef}
                            placeholders={["Enter your password", "••••••••", "********"]}
                            onChange={field.onChange}
                            onSubmit={() => {}}
                            type="password"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <RainbowButton type="submit" onClick={onSubmit}>
                    Log in
                  </RainbowButton>
                </div>
              </div>
            </Form>
          </div>
          <div className="flex gap-1 text-sm justify-center">
            <p>Don&rsquo;t have an account yet?</p>
            <Link href="/sign-up" className="underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}