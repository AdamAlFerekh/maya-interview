# Initial Predictions

These are my predictions before implementation. I will keep them unchanged after testing and record any corrections in the learning section below.

## 1. Where will each request run?

- Employee profile: Server Component, because it displays data without requiring user interaction.
- Server posts preview: Async Server Component, because it fetches and displays recent posts without user interaction.
- Explore all posts: Client Component, because the user clicks a button to request all posts.

## 2. What remains visible during preview loading?

My prediction: The employee profile remains visible while the recent posts
section displays its own Suspense loading fallback. The two sections can
render independently.

## 3. Does Suspense automatically handle a click-handler fetch?

My prediction: I think the fallback may appear if the fetch enters the catch block in the try/catch statement.

## 4. Does fetch throw on HTTP 503?

My prediction: Yes, I think fetch automatically throws an error when the server returns HTTP status 503.

---

# FINAL QUESTIONS:

## 1. Where does each request execute, and what evidence helped you verify that?

The Employee Profile and Recent Posts Preview fetch their data on the server because they are Server Components. The Explore All Posts section fetches data in the browser because it is a Client Component, and its request starts when the user clicks the button.

I verified the client-side behavior by clicking the button and observing the request in the browser's Network panel. I also observed the Recent Posts Preview's loading fallback while its delayed request was pending.

The user ID does not determine whether a request must run on the client or server. Both can use an ID that is already known to the code. The main difference in this application is where each request executes and what triggers it.

### 2. Why did you choose server fetching for the profile and client fetching for the button?

I chose server fetching for the Employee Profile and Recent Posts Preview because they load automatically when the page renders and don't require a button click. The preview also uses Suspense to display a fallback while its data is loading.

I chose client fetching for Explore All Posts because I wanted the request to happen only when the user clicks the button. The Client Component can then update the interface to show loading, success, empty, or error states.

### 3. What activates the preview’s Suspense fallback? Why doesn’t the click-handler request activate it automatically?

The Recent Posts Preview is wrapped in a Suspense boundary. When the asynchronous Server Component suspends while waiting for its data, React displays the fallback until the component is ready.

Explore All Posts works differently. Its fetch request starts when the user clicks the button, and the component uses an `isLoading` state to display its loading message. A normal fetch inside a click handler does not automatically activate Suspense, so the component manages its loading state itself.

### 4. What would change if you moved the preview’s boundary around the whole dashboard?

If I moved the Suspense boundary around the whole dashboard, the fallback could replace all the content inside it while Recent Posts Preview is waiting for its data. This could temporarily hide the Employee Profile and Explore All Posts, even though they are separate sections.

Keeping the boundary around only Recent Posts Preview allows the other sections to render independently while the preview is loading.

### 5. How does your custom error class help, and what does `super(message)` do?

My custom `ApiError` helps me distinguish HTTP errors from other errors by storing the HTTP status code. I can use `instanceof ApiError` in the catch block to identify these errors and display an appropriate message.

The `extends Error` part establishes inheritance from JavaScript's built-in Error class. `super(message)` calls the parent class's constructor and passes it the error message, so the error has the standard `message` property. I then add the HTTP status through `this.status = status`.

### 6. What is the difference between an HTTP failure, a network failure, and an empty result?

- **HTTP failure:** The request receives an unsuccessful HTTP response, such as status 503. The response exists, but `response.ok` is false.
- **Network failure:** The client cannot successfully communicate with the server, so the fetch request typically rejects without receiving a normal HTTP response.
- **Empty result:** The request succeeds, but the response contains no posts. In my assignment, this is represented by an empty array (`[]`), so the application displays an empty-state message instead of an error.


### 7. What happens if employee ID 1 is changed to 2 in all three sections?

The responses should change because the requests currently use ID 1. Changing the ID to 2 in all three sections should display the profile and posts associated with user 2, assuming the API has data for that user. I wouldn't need to change the UI or a database because the application retrieves this data from JSONPlaceholder. I would need to update all three request URLs to keep the displayed data consistent.


### 8. Which decision did you personally verify rather than accepting without checking?

I personally checked which components should be Server Components and which should be Client Components, based on how each section needs to work. I also used the browser's Network panel to inspect the API request, check its HTTP status, and examine the response data instead of assuming the request worked correctly.


## AI Reflection

I used AI as a learning, debugging, and styling assistant during this assignment. One meaningful suggestion it made was to move JSX returns outside the `try/catch` blocks in `EmployeeProfile` and `RecentPostsPreview` after ESLint reported errors.

I checked the actual output of `npm run lint` to understand the problem. I then applied the suggested changes and ran lint again to verify the fix.

I accepted the suggestion because it addressed the reported errors and helped me understand the difference between handling errors during data fetching and rendering JSX. This experience showed me that using AI is helpful, but I still need to review its suggestions, understand the reasoning, and verify the results myself.
