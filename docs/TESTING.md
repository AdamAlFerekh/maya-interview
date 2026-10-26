# Testing Report — Employee Explorer

**Date:** 2026-10-22

## 1. Functional Testing

### Test 1 — Server Employee Profile

**Action**: Opened the dashboard.

**Expected result:** Employee 1's name, email, and company are displayed.

**Actual result:** The page displayed employee 1's name as Leanne Graham, email as Sincere@april.biz and the company name as Romaguera-Crona

**Status:** PASS

---

### Test 2 — Server Preview Loading

**Expected result:**

- The recent-posts loading fallback appears during the intentional delay.
- The page heading and other page content remain visible.

**Actual result:**
Request 1: The fallback appeared and the rest of the components are still visible.

Request 2: The fallback appeared while still seeing the rest of the components.

After loading: Recent posts were visible.

**Status:** PASS

---

### Test 3 — Client Initial State

**Expected result:**

- The posts section initially displays an instruction to load posts.
- No client-side posts request occurs before clicking **Load posts**.

**Actual result:**
The posts section displayed the initial instruction: “Choose a scenario, then load the posts. Demo scenarios apply only to the next request. Click Load posts to retrieve the employee's posts..”

Before clicking Load Posts, I checked the browser's Network panel and observed zero requests to the client-side posts endpoint.

**Status:** PASS

---

### Test 4 — Slow Scenario

**Expected result:**

- Loading feedback appears during the two-second delay.
- The button remains visible and disabled while loading.
- Repeated clicks do not create duplicate requests.

**Actual result:**
Loading feedback: When loading is true I can see a message that indicates that the data is being loaded.

Button behavior: Button is now visible but disabled with a "loading" in it.

Keyboard focus: After loading finished, the button no longer had visible focus. I needed to press Tab to focus it again.

Network requests: The client api call returns a status code of 304 with the required data (it sends the payload properly which is 1), a single request is sent. 

**Status:** PASS

---

### Test 5 — Successful Request

**Expected result:**

- The request succeeds.
- Post titles and bodies appear on the page.

**Actual result:**

- An HTTP 200 response was observed in the Network panel.
- Displayed content an array of objects that contain (userId, id, title, body)

**Status:** PASS

---

### Test 6 — HTTP Error Handling

**Expected result:**

- The simulated HTTP 503 response goes through the shared `response.ok` check.
- An `ApiError` is created with the appropriate HTTP status.
- A clear error message appears, and the user can retry.

**Actual result:**
Response: The HTTP Error scenario generated a local HTTP 503 response.

Error handling: the validation got checked and an apiError has been displayed.

Displayed message: `Unable to load posts (HTTP ${error.status}). Please try again.`

Recovery: Switching to other scenarios such as success, empty, or slow will call the api once again the posts will load successfully.

Network Evidence: Since it is a local simulated 503 response, we are not able to see an error coming from the network.

**Status:** PASS

---

### Test 7 — Empty Response

**Expected result:**

- The simulated successful response containing an empty array displays an empty-state message.
- The empty response is not treated as an error.

**Actual result:**

- The Empty scenario displayed the message “No posts found.”
- The application displayed the empty state instead of an error message.

Response: Simulated HTTP 200 response containing an empty array ([])

**Status:** PASS

---

### Test 8 — Recovery After an Error

**Expected result:**

- Select **HTTP error** and load the posts.
- The expected error message appears.
- Switch to **Success** and click **Retry**.
- The error clears and the posts appear.

**Actual result:**

- The HTTP Error scenario displayed: “Unable to load posts (HTTP 503). Please try again.”
- After switching to Success and retrying, the api will be called once again and the error will be cleared, post titles and bodies do appear as well.
- The recovery was performed without refreshing the page.

**Status:** PASS

---

### Test 9 — Section Independence

**Expected result:** A client-side posts request failure does not remove the employee profile or recent-posts preview.

**Actual result:**

- The client-side posts section displayed its error message after the request failed.
- Employee Profile: Still visible.
- Recent Posts Preview: Visible.
- Page refresh: No need to refresh the page so the test becomes completed.

**Status:** PASS

---

### Test 10 — Accessibility and Responsive Layout

**Expected result:**

- The scenario selector has a visible, associated label.
- Interactive controls can be reached using the keyboard.
- Keyboard focus is clearly visible.
- The page remains readable at approximately 360px wide.

**Actual result:**

- Scenario selector: The label is visible and it is correctly associated with the selector.
- Keyboard navigation: I was able to reach and contral the interactive components using Tab, Enter, and Space where it is appropriate.
- Focus Visibility: The focused control had a visible focus indicator.
- Responsive Layout: Content remained readable.

**Status:** PASS

---

## 2. Screenshot Evidence

Save screenshots from the actual running application in `docs/screenshots/`.

### Screenshot 1 — Normal State

- **File:** `normal-state.png`
- **Purpose:** Show the page heading, employee profile, and recent-posts preview.
- **Status:** CAPTURED

### Screenshot 2 — Server Preview Loading

- **File:** `server-preview-loading.png`
- **Purpose:** Show the loading fallback while the page shell remains visible.
- **Status:** Captured

### Screenshot 3 — Client HTTP Error

- **File:** `client-http-error.png`
- **Purpose:** Show the error produced by the simulated HTTP 503 response.
- **Status:** CAPTURED

### Screenshot 4 — Empty Response

- **File:** `empty-response.png`
- **Purpose:** Show the empty-state message after selecting the Empty scenario.
- **Status:** CAPTURED

---

## 3. Code Quality Checks

### Lint

**Command:** `npm run lint`

**Expected result:** The lint command completes without errors, if the script is available.

**Actual result:** RAN

**Status:** 0 ERRORS

### Production Build

**Command:** `npm run build`

**Expected result:** The production build completes successfully.

**Actual result:** RAN

**Status:** RAN PROPERLY

---

## 4. Notes and Limitations

- The HTTP error and empty scenarios are simulated locally using the `Response` API. They are not responses returned by JSONPlaceholder.
- The Slow scenario waits two seconds before making a real JSONPlaceholder request.
- A test should be marked **PASS** only after its expected behavior has been observed.
