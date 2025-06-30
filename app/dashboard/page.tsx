"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import styles from "@/styles/dashboard.module.scss";
import Image from "next/image";

export default function DashboardPage() {
  const { user, isLoading, logout } = useAuth(); // Added signOut to the destructured values
  const router = useRouter();

  useEffect(() => {
    // Only redirect if we're done loading and there's no user
    if (!isLoading && !user) {
      router.push("/auth");
    }
  }, [user, isLoading, router]);

  const handleSignOut = async () => {
    try {
      await logout(); // Assuming your AuthContext has a signOut method
      router.push("/auth");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <p className={styles.isLoading}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // The useEffect will handle the redirect
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>
          Welcome to the Dashboard, {user.name.first} {user.name.last}!
        </h1>
        <div className={styles.userInfo}>
          <img
            src={user.picture.thumbnail}
            alt="User profile picture"
            width={64}
            height={64}
            className={styles.avatar}
            // priority // Important for above-the-fold images
          />
          <div>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
          </div>
        </div>
        <button onClick={handleSignOut} className={styles.signOutButton}>
          Sign Out
        </button>
      </div>
    </div>
  );
}
