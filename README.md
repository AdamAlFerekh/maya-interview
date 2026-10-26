Adam Al Ferekh

# Maya Interview — Next.js

A learning project built with Next.js, TypeScript, and the App Router. It demonstrates server-side data fetching, client-side interactions, Suspense loading states, and API error handling using the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/).

## Features

- **Employee Profile:** Fetches and displays an employee's name, email, and company.
- **Recent Posts Preview:** Fetches posts on the server and uses React Suspense to display a loading fallback.
- **Explore All Posts:** Loads posts on demand when the user clicks a button.
- **Request States:** Handles loading, success, empty responses, HTTP errors, and network failures.
- **Custom API Errors:** Uses a custom `ApiError` class to preserve HTTP status information.

## Getting Started

### Requirements

- Node.js
- npm

### Installation

Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/AdamAlFerekh/maya-interview.git
cd maya-interview
git switch assignment-3-maya-interview
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Demo Scenarios

The **Explore All Posts** section includes a scenario selector for testing different request states.

- **Success:** Makes a real request to JSONPlaceholder.
- **Slow:** Waits two seconds, then makes a real request to JSONPlaceholder.
- **HTTP Error:** Simulates a local HTTP 503 response.
- **Empty:** Simulates a successful response containing an empty array (`[]`).

The HTTP error and empty responses are created locally using the JavaScript `Response` API. They demonstrate how the application handles different responses; they are not responses returned by JSONPlaceholder.

To test recovery, select **HTTP Error** and load the posts. Then select **Success** and retry the request.

The Recent Posts Preview also uses an intentional two-second delay to demonstrate its Suspense loading fallback.

## Testing

Run ESLint:

```bash
npm run lint
```

Run the production build:

```bash
npm run build
```

See [`docs/TESTING.md`](docs/TESTING.md) for test cases, observed results, and screenshots.

## Project Documentation

- [`docs/INTERVIEW.md`](docs/INTERVIEW.md) — Implementation decisions, final explanations, and AI reflection.
- [`docs/TESTING.md`](docs/TESTING.md) — Testing evidence and results.

## Technologies

- [Next.js](https://nextjs.org/) ... "next": "16.4.2",
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/)
