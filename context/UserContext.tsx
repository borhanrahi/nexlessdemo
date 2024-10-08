"use client"
import React, { createContext, useState, useEffect, Dispatch, SetStateAction } from 'react';
import { supabase } from '@/lib/supabase';
import { ReactNode } from 'react';
import { User } from '@/lib/types';

type UserContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const fetchSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      const { id, email, user_metadata } = session.user;
      setUser({
        id,
        email,
        name: user_metadata?.name ?? '',
        subscription: user_metadata?.subscription || null,
        subscription_status: user_metadata?.subscription_status || null,
      });
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchSession();
  }, []);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          const { id, email, user_metadata } = session.user;
          setUser({
            id,
            email,
            name: user_metadata?.name ?? '',
            subscription: user_metadata?.subscription || undefined,
            subscription_status: user_metadata?.subscription_status || undefined,
          });
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};