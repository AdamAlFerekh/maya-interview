"use client";

import { useState } from "react";

type Post = {
  id: number;
  title: string;
  body: string;
};

type RequestStatus = "idle" | "loading" | "success" | "empty" | "error";

export default function AllPosts() {
  const [status, setStatus] = useState<RequestStatus>("idle");
  const [posts, setPosts] = useState<Post[]>([]);

  async function loadPosts() {
    setStatus("loading");

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts?userId=1",
      );

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data: Post[] = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Unexpected response format");
      }

      setPosts(data);
      setStatus(data.length === 0 ? "empty" : "success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section>
      <h2>Explore All Posts</h2>

      {status === "idle" && (
        <p>Click the button to load all posts for this employee.</p>
      )}

      {status === "loading" && <p>Loading posts...</p>}

      {status === "error" && (
        <p role="alert">
          Unable to load posts. Please check your connection and try again.
        </p>
      )}

      {status === "empty" && <p>No posts found</p>}

      {status === "success" && (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}

      {(status === "idle" || status === "error") && (
        <button type="button" onClick={loadPosts}>
          Load posts
        </button>
      )}
    </section>
  );
}
