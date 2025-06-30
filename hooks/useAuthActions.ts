import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { validatePhoneNumber } from "@/utils/validation";

export const useAuthActions = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (phone: string) => {
    const validationError = validatePhoneNumber(phone);
    if (validationError) {
      setError(validationError);
      return { success: false };
    }

    setIsLoading(true);
    try {
      const response = await fetch("https://randomuser.me/api/?results=1&nat=us");
      const data = await response.json();

      if (data.results?.length > 0) {
        const user = data.results[0];
        login({
          name: user.name,
          email: user.email,
          phone: user.phone,
          picture: user.picture,
        });
        router.push("/dashboard");
        return { success: true };
      }
      return { success: false };
    } catch (err) {
      console.error("Error fetching user:", err);
      setError("Failed to login. Please try again.");
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    error,
    isLoading,
    handleLogin,
    setError,
  };
};
