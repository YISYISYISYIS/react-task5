"use client";
import react, { useEffect, useState } from "react";
import supabase from "@/apis/supabaseKey";

const loginPage = () => {
  const [posts, setPosts] = useState([]);

  async function getPosts() {
    let { data: posts, error } = await supabase.from("posts").select("*");

    if (error) console.error(error);
    console.log(posts);

    setPosts(posts);
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <h2>{post.content}</h2>
          </li>
        ))}
      </ul>
    </>
  );
};

export default loginPage;
