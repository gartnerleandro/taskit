import { createContext, useState, useEffect, useContext } from "react";
import { Session } from "@supabase/supabase-js";
import { router } from "expo-router";

import { supabase } from "@/lib/supabase";

type AuthData = {
  loading: boolean;
  session: Session | null;
};

const AuthContext = createContext<AuthData>({
  loading: true,
  session: null,
});

interface Props {
  children: React.ReactNode;
}

export default function AuthProvider(props: Props) {
  const [loading, setLoading] = useState<boolean>(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    async function fetchSession() {
      const { error, data } = await supabase.auth.getSession();

      if (error) {
        throw error;
      }

      if (data.session) {
        setSession(data.session);
      } else {
        router.replace("/signin");
      }

      setLoading(false);
    }

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (_, session) => {
      setSession(session);
      setLoading(false);

      if (session) {
        router.replace("/");
      } else {
        router.replace("/signin");
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ loading, session}}>
      {props.children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);