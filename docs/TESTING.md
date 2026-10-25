# Testing Report — Employee Explorer

**Date:** 2026-10-22

## 1. Functional Testing

### Test 1 — Server Employee Profile

**Expected result:** Employee 1's name, email, and company are displayed.

**Actual result:** Employee 1's name, email, and company were displayed correctly.

**Status:** PASS

---

### Test 2 — Server Preview Loading

**Expected result:**

- The recent-posts loading fallback appears during the intentional delay.
- The page heading and other page content remain visible.

**Actual result:** The loading fallback is shown, and the other components are visible.

**Status:** PASS

---

### Test 3 — Client Initial State

**Expected result:**

- The posts section initially displays an instruction to load posts.
- No client-side posts request occurs before clicking **Load posts**.

**Actual result:** TRUE

**Status:** PASS

---

### Test 4 — Slow Scenario

**Expected result:**

- Loading feedback appears during the two-second delay.
- Repeated clicks do not create duplicate requests.

**Actual result:** Loading feedback is shown and the button is disabled and turned into a loading feedback.

**Status:** PASS

---

### Test 5 — Successful Request

**Expected result:**

- The request succeeds.
- Post titles and bodies appear on the page.

**Actual result:** An HTTP 200 response was observed in the Network panel.

**Status:** PASS

---

### Test 6 — HTTP Error Handling

**Expected result:**

- The simulated HTTP 503 response goes through the shared `response.ok` check.
- An `ApiError` is created with the appropriate HTTP status.
- A clear error message appears, and the user can retry.

**Actual result:** Everything is working fine

**Status:** PASS

---

### Test 7 — Empty Response

**Expected result:**

- The simulated successful response containing an empty array displays an empty-state message.
- The empty response is not treated as an error.

**Actual result:** No posts found is displayed

**Status:** PASS

---

### Test 8 — Recovery After an Error

**Expected result:**

- Select **HTTP error** and load the posts.
- The expected error message appears.
- Switch to **Success** and click **Retry**.
- The error clears and the posts appear.

**Actual result:** TESTED

**Status:** PASS

---

### Test 9 — Section Independence

**Expected result:** A client-side posts request failure does not remove the employee profile or recent-posts preview.

**Actual result:** TESTED

**Status:** PASS

---

### Test 10 — Accessibility and Responsive Layout

**Expected result:**

- The scenario selector has a visible, associated label.
- Interactive controls can be reached using the keyboard.
- Keyboard focus is clearly visible.
- The page remains readable at approximately 360px wide.

**Actual result:** TESTED

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
