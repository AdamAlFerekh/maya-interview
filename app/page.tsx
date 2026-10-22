import { Suspense } from "react";
import EmployeeProfile from "@/components/EmployeeProfile";
import RecentPostsPreview from "@/components/RecentPostsPreview";

export default function Home() {
  return (
    <main>
      <h1>Employee Explorer</h1>
      <p>Explore employee information and recent posts.</p>

      <Suspense fallback={<p>Loading employee profile...</p>}>
        <EmployeeProfile />
      </Suspense>

      <Suspense
        fallback={
          <section>
            <h2>Recent Posts</h2>
            <p>Loading recent posts preview...</p>
          </section>
        }
      >
        <RecentPostsPreview />
      </Suspense>
    </main>
  );
}
