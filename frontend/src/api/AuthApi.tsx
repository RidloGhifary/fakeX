const BASE_URL = import.meta.env.VITE_API_URL;

interface SignUpProps {
  username: string;
  email: string;
  password: string;
}

export const UseSignUp = async (formData: SignUpProps) => {
  const response = await fetch(`${BASE_URL}/api/auth/sign-up`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();
  if (!responseBody) throw new Error(responseBody.message);

  return responseBody;
};

interface SignInProps {
  username: string;
  password: string;
}

export const UseSignIn = async (formData: SignInProps) => {
  const response = await fetch(`${BASE_URL}/api/auth/sign-in`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();
  if (!responseBody) throw new Error(responseBody.message);

  return responseBody;
};

export const UseValidateToken = async () => {
  const response = await fetch(`${BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error("Invalid token");

  return await response.json();
};
