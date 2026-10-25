import { Suspense } from "react";
import EmployeeProfile from "@/components/EmployeeProfile";
import RecentPostsPreview from "@/components/RecentPostsPreview";
import AllPosts from "@/components/AllPosts";

export default function Home() {
  return (
    <main>
      <header className="page-header">
        <p className="page-eyebrow">Employee workspace</p>
        <h1>Employee Explorer</h1>
        <p className="page-description">
          Explore employee information, discover recent updates, and browse the
          complete collection of posts.
        </p>
      </header>

      <Suspense
        fallback={
          <section>
            <h2>Employee Profile</h2>
            <p role="status">Loading employee profile...</p>
          </section>
        }
      >
        <EmployeeProfile />
      </Suspense>

      <Suspense
        fallback={
          <section>
            <h2>Recent Posts</h2>
            <p role="status">Loading recent posts preview...</p>
          </section>
        }
      >
        <RecentPostsPreview />
      </Suspense>

      <AllPosts />
    </main>
  );
}
