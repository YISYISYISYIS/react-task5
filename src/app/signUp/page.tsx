"use client";

import supabase from "@/apis/supabaseKey";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const [email, setEmail] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const router = useRouter();

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    const pattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
    e.preventDefault();
    // console.log(
    //   "폼제출 버튼클릭 email=>",
    //   email,
    //   "패스워드=>",
    //   password,
    //   "비번확인=>",
    //   confirmPassword
    // );
    if (nickname.length < 2 || nickname.length > 10) {
      return alert("2자리 이상10자리 이하로 작성해주세요");
    }
    if (!pattern.test(email)) {
      return alert("올바른 형식의 이메일이 아닙니다.");
    }

    if (password.length < 6 || password.length > 12) {
      return alert("비밀번호는 6자리 이상 12자리 이하로 작성해 주세요");
    }
    if (password !== confirmPassword) {
      return alert("비밀번호를 확인해주세요");
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            name: nickname,
          },
        },
      });

      alert("회원가입 성공");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      router.push("/signUp");
    } catch (error) {
      console.error("회원가입 오류:", error);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              이메일
            </label>
            <input
              id="email"
              type="email"
              value={email}
              placeholder="이메일형식으로 입력 해주세요"
              className="mt-1 p-2 w-full border rounded"
              onChange={(e) => setEmail(e.target.value.replace(/\s/g, ""))}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="nickname"
              className="block text-sm font-medium text-gray-700"
            >
              닉네임
            </label>
            <input
              id="nickname"
              type="text"
              value={nickname}
              placeholder="닉네임은 2~10자 사이"
              className="mt-1 p-2 w-full border rounded"
              onChange={(e) => setNickname(e.target.value.replace(/\s/g, ""))}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              value={password}
              className="mt-1 p-2 w-full border rounded"
              placeholder="비밀번호 6자 이상 12자이하"
              onChange={(e) => setPassword(e.target.value.replace(/\s/g, ""))}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              비밀번호 확인
            </label>
            <input
              id="confirmPassword"
              type="Password"
              value={confirmPassword}
              className="mt-1 p-2 w-full border rounded"
              placeholder="비밀번호 6자 이상 12자이하"
              onChange={(e) =>
                setConfirmPassword(e.target.value.replace(/\s/g, ""))
              }
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-black"
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
