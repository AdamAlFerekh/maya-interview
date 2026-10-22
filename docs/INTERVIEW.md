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

# What I Learned After Testing

Leave this section empty until the implementation has been tested.

## 1. Request execution

## 2. Preview loading behavior

## 3. Suspense and click-handler fetching

## 4. HTTP 503 handling
