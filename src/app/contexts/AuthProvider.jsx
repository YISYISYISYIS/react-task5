"use client";

import supabase from "@/apis/supabaseKey";
import React, { useEffect, useState, createContext } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      // console.log(event, session);

      if (session) {
        setIsLogin(true);
        setSession(session);
      } else {
        setIsLogin(false);
        setSession(null);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin, session }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
