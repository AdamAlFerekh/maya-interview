type Employee = {
  name: string;
  email: string;
  company: {
    name: string;
  };
};

export default async function EmployeeProfile() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users/1",
    );

    if (!response.ok) {
      throw new Error("Failed to fetch employee data");
    }

    const employee: Employee = await response.json();

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
  } catch {
    return (
      <section>
        <h2>Employee Profile</h2>
        <p>Unable to load the employee profile. Please try again later.</p>
      </section>
    );
  }
}
