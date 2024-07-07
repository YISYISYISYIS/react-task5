"use client";

import React, { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { useRouter } from "next/navigation";

const myPage = () => {
  const { isLogin, session } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!isLogin) {
      router.push("/");
    }
  }, [isLogin]);
  return (
    <>
      <div>닉네임 {session?.user?.user_metadata?.name}</div>
      <div>이메일 {session?.user?.user_metadata?.email}</div>
    </>
  );
};

export default myPage;
