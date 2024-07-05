"use client";
import React, { createContext,useContext } from "react";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { createBrowserClient } from "@supabase/ssr";

export const SupbaseContext = createContext<SupabaseClient<
  any,
  "public",
  any
> | null>(null);

export function useSupbase(){
  return useContext(SupbaseContext);
}

const SupbaseProvider = ({ children }: React.PropsWithChildren) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
  // const supabase = createClient(supabaseUrl, supabaseKey);
  const supabase = createBrowserClient(supabaseUrl, supabaseKey);
  return (
    <SupbaseContext.Provider value={supabase}>
      {children}
    </SupbaseContext.Provider>
  );
};

export default SupbaseProvider;
