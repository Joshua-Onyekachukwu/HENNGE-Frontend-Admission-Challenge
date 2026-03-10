# HENNGE Frontend Challenge - Technical Report

This document provides a detailed report on the process, technical decisions, and outcomes of completing the HENNGE Frontend Admission Challenge.

## 1. Overview of the Challenge

The primary objective was to build a secure and interactive user registration form as a single-page React application. The challenge was divided into three main missions:

1.  **Mission 1 (Core Implementation):** Implement the frontend component (`create-user-form.tsx`) with two major systems:
    *   **Client-Side Validation:** Live, dynamic password validation that provides real-time feedback to the user against a specific set of rules.
    *   **API Integration:** Securely submitting the form data to a provided REST API endpoint and correctly handling all possible success and error responses.
2.  **Mission 2 (Code Publication):** Publishing the final component as a secret GitHub Gist.
3.  **Mission 3 (Final Submission):** Sending a `POST` request with personal and Gist details to a final submission endpoint.

A strict set of constraints was enforced, including no external dependencies, no CSS modifications, and containing all logic within the single provided file.

## 2. Our Approach and Key Technical Decisions

Our approach was methodical and aligned with professional engineering standards, prioritizing clarity, correctness, and maintainability.

*   **Framework and Language:** We used **React 18** with **TypeScript**, leveraging modern functional components and hooks. This choice aligns with modern web development standards and allowed for strong type safety.

*   **State Management:** We made a key decision to use only React's built-in hooks (`useState`, `useEffect`) for all state management. This was a deliberate choice to adhere to the "no external dependencies" rule and to demonstrate that a clean solution does not always require large state management libraries like Redux. State was granularly managed for username, password, validation errors, API errors, and submission status.

*   **API Client:** We used the browser-native **`fetch` API** for all network requests. This avoided adding any external libraries like Axios and demonstrated proficiency with modern web platform APIs.

*   **Validation Logic:** For real-time validation, a `useEffect` hook was implemented to listen for changes to the `password` and `username` state. This created an efficient side effect that re-ran validation logic only when necessary, providing instant feedback to the user without performance overhead.

*   **Code Structure:** We used `const` objects to define and manage all validation rule strings and API error messages. This standard practice makes the code easier to read, maintain, and debug, as all user-facing strings are centralized.

## 3. Difficulties Encountered and Solutions

The primary obstacles were not in the code itself, but in the environment during the final submission step.

*   **Obstacle 1: PowerShell `curl` Alias:** The initial `curl` commands failed because the user's PowerShell terminal was using a built-in alias for `curl` that points to `Invoke-WebRequest`, which has incompatible syntax.
    *   **Solution:** We resolved this by explicitly calling `curl.exe`, forcing PowerShell to use the correct executable and interpret the command-line arguments correctly.

*   **Obstacle 2: Command-Line Quoting in PowerShell:** Even with `curl.exe`, PowerShell had issues correctly parsing the nested quotes within the JSON data string provided via the `-d` flag, leading to a `Malformed input` error.
    *   **Solution:** We pivoted to a more robust, industry-standard solution. We programmatically created a temporary `payload.json` file containing the submission data and then used the `--data "@payload.json"` flag with `curl.exe`. This instructed `curl` to read the data directly from the file, completely bypassing any shell-related quoting issues.

## 4. Assumptions Made

*   We assumed a standard Vite/Create React App project structure where the `create-user-form.tsx` component would be imported into a parent `App.tsx` component that provides the `onSuccess` callback.
*   We assumed the user's local machine had Node.js and `pnpm` available for providing setup and run instructions in the `README.md`.

## 5. Potential Future Improvements

While the submitted solution is complete and robust, in a real-world scenario without the challenge constraints, several improvements could be made:

*   **Custom Hooks:** The password validation logic could be extracted into a custom hook (e.g., `usePasswordValidation`) to make the main component cleaner and the logic more reusable across other potential forms.
*   **UI/UX Feedback:** For a better user experience, a loading spinner could be integrated into the submit button itself rather than just disabling it.
*   **Environment Variables:** The `AUTH_TOKEN` and `API_BASE_URL` would be stored in environment variables (`.env` file) rather than as constants in the code, which is a critical security and configuration best practice.
*   **API Client Abstraction:** The `fetch` logic could be moved to a dedicated API client module, allowing for centralized handling of headers, base URLs, and response parsing, making the code more modular and easier to test.
