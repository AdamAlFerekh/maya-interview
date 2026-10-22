import EmployeeProfile from "@/components/EmployeeProfile";
import { Suspense } from "react";

export default function Home() {
  return (
    <main>
      <h1>Employee Explorer</h1>
      <Suspense fallback={<p>Loading employee profile...</p>}>
        <EmployeeProfile />
      </Suspense>
    </main>
  );
}
