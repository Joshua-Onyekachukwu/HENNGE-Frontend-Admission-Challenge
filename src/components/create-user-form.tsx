
import React, { useState, useEffect } from 'react';

// Per the challenge, the token is in the URL path.
// In a real app, this would be parsed from the URL.
// For this challenge, replace 'YOUR_TOKEN_HERE' with the actual token.
const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsib255ZWthY2h1a3d1am9zaHVhMzlAZ21haWwuY29tIl0sImlzcyI6Imhlbm5nZS1hZG1pc3Npb24tY2hhbGxlbmdlIiwic3ViIjoiY2hhbGxlbmdlIn0.8VB3li1m3YJBXrA8XedQ4IC3FIGjmUR7QE9N5W4HjIs'; 

const API_BASE_URL = 'https://challenge.hennge.com/api/v1';

// Validation Rules Constants
const VALIDATION_RULES = {
  MIN_LENGTH: 'Password must be at least 10 characters long',
  LOWERCASE: 'Password must contain at least one lowercase letter',
  UPPERCASE: 'Password must contain at least one uppercase letter',
  NUMBER: 'Password must contain at least one number',
  NO_SPACES: 'Password cannot contain spaces',
  NO_USERNAME: 'Password cannot contain the username',
};

// API Error Message Constants
const API_ERRORS = {
  INTERNAL_SERVER_ERROR: 'Internal Server Error',
  COMMON_PASSWORD: 'Password is too common',
  AUTH_FAILED: 'Authentication failed',
  GENERIC_ERROR: 'An unexpected error occurred. Please try again.',
};

interface CreateUserFormProps {
  onSuccess: () => void;
}

const CreateUserForm: React.FC<CreateUserFormProps> = ({ onSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const validatePassword = () => {
      const errors: string[] = [];
      if (password.length < 10) {
        errors.push(VALIDATION_RULES.MIN_LENGTH);
      }
      if (!/[a-z]/.test(password)) {
        errors.push(VALIDATION_RULES.LOWERCASE);
      }
      if (!/[A-Z]/.test(password)) {
        errors.push(VALIDATION_RULES.UPPERCASE);
      }
      if (!/[0-9]/.test(password)) {
        errors.push(VALIDATION_RULES.NUMBER);
      }
      if (/\s/.test(password)) {
        errors.push(VALIDATION_RULES.NO_SPACES);
      }
      if (username && password.toLowerCase().includes(username.toLowerCase())) {
        errors.push(VALIDATION_RULES.NO_USERNAME);
      }
      setValidationErrors(errors);
    };

    if (password) {
        validatePassword();
    } else {
        setValidationErrors([]);
    }
  }, [password, username]);

  const isFormInvalid = validationErrors.length > 0 || !username;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isFormInvalid) {
      return;
    }

    setIsSubmitting(true);
    setApiError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        onSuccess();
      } else {
        const errorData = await response.json().catch(() => ({})); // Gracefully handle non-JSON responses
        switch (response.status) {
          case 400:
            // Assuming the specific password error comes with a 400 status
            // and a body like { "error": "password is too common" }
            if (errorData.message && errorData.message.includes('common')) {
                 setApiError(API_ERRORS.COMMON_PASSWORD);
            } else {
                 setApiError(errorData.message || API_ERRORS.GENERIC_ERROR);
            }
            break;
          case 401:
          case 403:
            setApiError(API_ERRORS.AUTH_FAILED);
            break;
          case 500:
            setApiError(API_ERRORS.INTERNAL_SERVER_ERROR);
            break;
          default:
            setApiError(API_ERRORS.GENERIC_ERROR);
            break;
        }
      }
    } catch (error) {
      setApiError(API_ERRORS.GENERIC_ERROR);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-user-form">
      <div className="form-field">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          aria-label="Username"
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-label="Password"
          aria-invalid={validationErrors.length > 0}
          aria-describedby={validationErrors.length > 0 ? "password-errors" : undefined}
          required
        />
      </div>

      {validationErrors.length > 0 && (
        <div id="password-errors" className="validation-errors">
          <ul>
            {validationErrors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {apiError && (
        <div className="api-error">
          <p>{apiError}</p>
        </div>
      )}

      <button type="submit" disabled={isFormInvalid || isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Create User'}
      </button>
    </form>
  );
};

export default CreateUserForm;
