import { makeRequest } from "@/utils/axios";

interface SignUpProps {
  username: string;
  email: string;
  password: string;
}

export const UseSignUp = async (formData: SignUpProps) => {
  const response = await makeRequest.post("/auth/sign-up", formData);
  return response;
};

interface SignInProps {
  username: string;
  password: string;
}

export const UseSignIn = async (formData: SignInProps) => {
  const response = await makeRequest.post("/auth/sign-in", formData);
  return response;
};

export const UseLogOut = async () => {
  const response = await makeRequest.post("/auth/logout");
  return response;
};

export const UseValidateToken = async () => {
  const response = await makeRequest.get("/auth/validate-token");
  return response;
};

interface VerifyOtpProps {
  data: { otp: string };
  userId: string;
}

export const UseVerifyOtp = async ({ data, userId }: VerifyOtpProps) => {
  const response = await makeRequest.post(`/auth/verifyOTP/${userId}`, data);

  return response;
};
