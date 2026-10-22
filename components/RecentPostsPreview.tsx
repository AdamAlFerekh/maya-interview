import { connection } from "next/server";

type Post = {
  id: number;
  title: string;
};

export default async function RecentPostsPreview() {
  await connection();

  // Intentional learning simulation: delay the preview by 2 seconds
  // so its Suspense fallback is visible during the demonstration.
  
  await new Promise((resolve) => setTimeout(resolve, 2000));

  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts?userId=1"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch recent posts");
    }

    const posts: Post[] = await response.json();

    return (
      <section>
        <h2>Recent Posts</h2>
        <ul>
          {posts.slice(0, 3).map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      </section>
    );
  } catch {
    return (
      <section>
        <h2>Recent Posts</h2>
        <p>Unable to load recent posts. Please try again later.</p>
      </section>
    );
  }
}
