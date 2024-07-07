"use client";

import React, { useContext } from "react";
import Link from "next/link";
import supabase from "@/apis/supabaseKey";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/contexts/AuthProvider";

const Header = () => {
  const router = useRouter();
  const { isLogin, session } = useContext(AuthContext);
  // console.log(session.user.user_metadata.name);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <header className="w-full h-14 bg-slate-700 flex justify-between items-center px-20">
      <nav className="w-full flex justify-between items-center px-20">
        <Link href="/">
          <h1 className="font-bold text-white">나만의 포켓몬 도감 </h1>
        </Link>
        <div className="space-x-4">
          {isLogin ? (
            <>
              <Link href="/myPage">
                <span className="font-bold text-white">
                  {session?.user?.user_metadata?.name}
                </span>
              </Link>
              <button onClick={handleLogout} className="font-bold text-white">
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link href="/signUp">
                <button className="font-bold text-white">회원가입</button>
              </Link>
              <Link href="/login">
                <button className="font-bold text-white">로그인</button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
