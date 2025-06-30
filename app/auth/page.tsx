"use client";

import { useState } from "react";
import { useAuthActions } from "@/hooks/useAuthActions";
import styles from "@/styles/auth.module.scss";
import Input from "@/components/Input";
import Button from "@/components/Button";

export default function AuthPage() {
  const [phone, setPhone] = useState("");
  const { error, isLoading, handleLogin, setError } = useAuthActions();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleLogin(phone);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Login</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            label="Phone Number"
            type="tel"
            placeholder="e.g., 09123456789"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setError("");
            }}
            error={error}
          />
          <Button type="submit" isLoading={isLoading}>
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
