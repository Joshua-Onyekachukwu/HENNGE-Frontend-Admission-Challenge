# HENNGE Frontend Admission Challenge Solution

This repository contains the complete solution for the HENNGE Frontend Admission Challenge, implemented by Joshua Onyekachukwu with the assistance of a Gemini-powered AI agent.

## Project Overview

The core of this project is a single-page React application that features a secure user registration form. The primary goal was to demonstrate proficiency in modern frontend development practices, including client-side validation, API integration, error handling, and accessibility, while adhering to a strict set of constraints.

The application provides real-time feedback to the user as they type a password, validating it against a set of predefined rules. It prevents form submission until all rules are met and handles various API responses gracefully, ensuring a clear and intuitive user experience.

## Technologies Used

- **Framework:** React 18
- **Language:** TypeScript
- **Styling:** Standard CSS (per challenge constraints)
- **API:** Browser `fetch` API
- **Tooling:** Vite (assumed standard project setup)

No external dependencies were used for the core application logic, as required by the challenge.

## Features

- **Real-Time Password Validation:** Dynamically validates password strength against multiple rules as the user types.
- **Secure API Integration:** Communicates with a REST API to register a user, including bearer token authentication.
- **Comprehensive Error Handling:** Provides specific user feedback for different API responses (e.g., 500 Internal Server Error, 401/403 Authentication Failed, 400 Bad Request).
- **Accessible Forms:** Implements ARIA attributes (`aria-invalid`, `aria-describedby`) to ensure the form is accessible to users of assistive technology.
- **Single-File Architecture:** All application logic is encapsulated within a single React component (`create-user-form.tsx`) as per the challenge rules.

## Setup and Installation

To run this project locally, you will need to have Node.js and `pnpm` installed.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Joshua-Onyekachukwu/HENNGE-Frontend-Admission-Challenge.git
    cd HENNGE-Frontend-Admission-Challenge
    ```

2.  **Install dependencies:**
    The project was built in an environment assuming `pnpm` is the package manager.
    ```bash
    pnpm install
    ```

3.  **Configure Authorization Token:**
    Open `src/components/create-user-form.tsx` and replace the placeholder value of the `AUTH_TOKEN` constant with the actual token provided in the challenge details.

    ```typescript
    const AUTH_TOKEN = 'YOUR_TOKEN_HERE'; // Replace with your actual token
    ```

## Running the Project

Once the setup is complete, you can run the development server:

```bash
pnpm run dev
```

This will start the application, and you can view it in your browser at the local address provided (usually `http://localhost:5173`).
