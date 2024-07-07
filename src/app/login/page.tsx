"use client";
import react, { useEffect, useState } from "react";
import supabase from "@/apis/supabaseKey";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  // const [posts, setPosts] = useState([]);

  // async function getPosts() {
  //   let { data: posts, error } = await supabase.from("posts").select("*");

  //   if (error) console.error(error);
  //   console.log(posts);

  //   setPosts(posts);
  // }

  // useEffect(() => {
  //   getPosts();
  // }, []);
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    const pattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;

    if (!pattern.test(email)) {
      return alert("올바른 형식의 이메일이 아닙니다.");
    }
    if (password.length < 6 || password.length > 12) {
      return alert("비밀번호는 6자리 이상 12자리 이하로 작성해 주세요");
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        // console.log("로그인 성공:", user.user_metadata);
        alert("로그인 성공");
        setEmail("");
        setPassword("");
        router.push("/");
      } else {
        alert("로그인 실패");
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      alert("로그인 중 오류가 발생했습니다.");
    }
  };

  const handleSignUp = () => {
    router.push("/signUp");
  };

  return (
    // <>
    //   <ul>
    //     {posts.map((post) => (
    //       <li key={post.id}>
    //         <h2>{post.title}</h2>
    //         <h2>{post.content}</h2>
    //       </li>
    //     ))}
    //   </ul>
    // </>
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

          <div className="mb-8">
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

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-black mb-4"
          >
            로그인
          </button>
        </form>
        <button
          onClick={handleSignUp}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-black"
        >
          회원가입
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
