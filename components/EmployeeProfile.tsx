import { ApiError } from "@/lib/api-error";

type Employee = {
  name: string;
  email: string;
  company: {
    name: string;
  };
};

export default async function EmployeeProfile() {
  let employee: Employee | null = null;
  let errorMessage = "";

  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users/1",
    );

    if (!response.ok) {
      throw new ApiError(
        "The employee profile request failed.",
        response.status,
      );
    }

    employee = await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      errorMessage = `Unable to load the employee profile (HTTP ${error.status}). Please try again later.`;
    } else {
      errorMessage =
        "Unable to reach the employee service. Please check your connection and try again later.";
    }
  }

  if (errorMessage || !employee) {
    return (
      <section>
        <h2>Employee Profile</h2>
        <p role="alert">
          {errorMessage || "Unable to load the employee profile."}
        </p>
      </section>
    );
  }

  return (
    <section>
      <h2>Employee Profile</h2>
      <p>
        <strong>Name:</strong> {employee.name}
      </p>
      <p>
        <strong>Email:</strong> {employee.email}
      </p>
      <p>
        <strong>Company:</strong> {employee.company.name}
      </p>
    </section>
  );
}
