"use client";

import { createClient } from "@supabase/supabase-js";
import react, { useEffect, useState } from "react";

const supabaseUrl = "https://woipwpqxhudcnudftxac.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvaXB3cHF4aHVkY251ZGZ0eGFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAxMTU2MjAsImV4cCI6MjAzNTY5MTYyMH0.XeK1R69xX9gjCU4yXtwuqE0SDbd9NSw9ZJGDJ6hWucQ";
const supabase = createClient(supabaseUrl, supabaseKey);

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
