"use client";
import React, { createContext, useContext } from "react";
import { SupabaseClient } from "@supabase/supabase-js";
import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/interfaces/supabase";

interface SupabaseContextType {
  supabase: SupabaseClient<any, "public", any> | null;
}

export const SupabaseContext = createContext<SupabaseContextType>({
  supabase: null,
});

export function useSupabase() {
  return useContext(SupabaseContext);
}

const SupabaseProvider = ({ children }: React.PropsWithChildren) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
  // const supabase = createClient(supabaseUrl, supabaseKey);
  const supabase = createBrowserClient<Database>(supabaseUrl, supabaseKey);
  return (
    <SupabaseContext.Provider value={{ supabase }}>
      {children}
    </SupabaseContext.Provider>
  );
};

export default SupabaseProvider;
