"use client";

import { useState } from "react";
import { ApiError } from "@/lib/api-error";

type Post = {
  id: number;
  title: string;
  body: string;
};

type Scenario = "success" | "slow" | "http-error" | "empty";
type Status = "idle" | "success" | "empty" | "error";

export default function AllPosts() {
  const [scenario, setScenario] = useState<Scenario>("success");
  const [status, setStatus] = useState<Status>("idle");
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  async function loadPosts() {
    setIsLoading(true);
    setStatus("idle");
    setErrorMessage("");
    setPosts([]);

    try {
      let response: Response;

      if (scenario === "slow") {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Slow mode still makes a real API request.
        response = await fetch(
          "https://jsonplaceholder.typicode.com/posts?userId=1",
        );
      } else if (scenario === "http-error") {
        // Simulation: this response is created locally, not by the API.
        response = new Response(
          JSON.stringify({ message: "Simulated service unavailable" }),
          {
            status: 503,
            statusText: "Service Unavailable",
            headers: { "Content-Type": "application/json" },
          },
        );
      } else if (scenario === "empty") {
        // Simulation: a successful response containing an empty array.
        response = new Response(JSON.stringify([]), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      } else {
        response = await fetch(
          "https://jsonplaceholder.typicode.com/posts?userId=1",
        );
      }

      // All scenarios pass through the same HTTP status check.
      if (!response.ok) {
        throw new ApiError(
          `The posts service returned HTTP ${response.status}.`,
          response.status,
        );
      }

      const data: unknown = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Unexpected response format");
      }

      const receivedPosts = data as Post[];

      setPosts(receivedPosts);
      setStatus(receivedPosts.length === 0 ? "empty" : "success");
    } catch (error) {
      if (error instanceof ApiError) {
        setErrorMessage(
          `Unable to load posts (HTTP ${error.status}). Please try again.`,
        );
      } else {
        setErrorMessage(
          "Unable to reach the posts service. Check your connection and try again.",
        );
      }

      setStatus("error");
    } finally {
      // Loading always ends, whether the request succeeds or fails.
      setIsLoading(false);
    }
  }

  return (
    <section>
      <h2>Explore All Posts</h2>

      <div>
        <label htmlFor="demo-scenario">Demo scenario: </label>
        <select
          id="demo-scenario"
          value={scenario}
          onChange={(event) => setScenario(event.target.value as Scenario)}
          disabled={isLoading}
        >
          <option value="success">Success — real API</option>
          <option value="slow">Slow — real API after 2 seconds</option>
          <option value="http-error">HTTP error — simulated 503</option>
          <option value="empty">Empty — simulated empty response</option>
        </select>
      </div>

      <p>
        Choose a scenario, then load the posts. Demo scenarios apply only to the
        next request.
      </p>

      {isLoading && <p role="status">Loading posts...</p>}

      {!isLoading && status === "idle" && (
        <p>Click Load posts to retrieve the employee's posts.</p>
      )}

      {!isLoading && status === "error" && <p role="alert">{errorMessage}</p>}

      {!isLoading && status === "empty" && <p>No posts found</p>}

      {!isLoading && status === "success" && (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}

      {!isLoading && (
        <button type="button" onClick={loadPosts}>
          {status === "error" ? "Retry" : "Load posts"}
        </button>
      )}
    </section>
  );
}
