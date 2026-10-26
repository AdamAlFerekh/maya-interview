import { ApiError } from "@/lib/api-error";
import { connection } from "next/server";

type Post = {
  id: number;
  title: string;
};

export default async function RecentPostsPreview() {
  let posts: Post[] = [];
  let errorMessage = "";

  // Intentional learning simulation: delay the preview by 2 seconds
  // so its Suspense fallback is visible during the demonstration.
  await connection();

  await new Promise((resolve) => setTimeout(resolve, 2000));

  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts?userId=1",
    );

    if (!response.ok) {
      throw new ApiError("The recent posts request failed.", response.status);
    }

    posts = await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      errorMessage = `Unable to load recent posts (HTTP ${error.status}).`;
    } else {
      errorMessage =
        "Unable to reach the posts service. Please try again later.";
    }
  }

  if (errorMessage) {
    return (
      <section>
        <h2>Recent Posts</h2>
        <p role="alert">{errorMessage}</p>
      </section>
    );
  }

  return (
    <section>
      <h2>Recent Posts</h2>
      {posts.length === 0 ? (
        <p>No recent posts found.</p>
      ) : (
        <ul>
          {posts.slice(0, 3).map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
