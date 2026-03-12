"use client";

import { AuthProps, login } from "@/lib/api/clientApi";
import css from "./SignInPage.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AxiosError } from "axios";
import { useAuthStore } from "@/lib/store/authStore";

const SignIn = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData) as unknown as AuthProps;
      const user = await login(formValues);

      if (user) {
        setUser(user);
        router.push("/profile");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      const err = error as AxiosError<{ error?: string }>;
      setError(
        err.response?.data?.error ?? err.message ?? "Oops... some error",
      );
    }
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} action={handleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        <p className={css.error}>{error}</p>
      </form>
    </main>
  );
};

export default SignIn;
