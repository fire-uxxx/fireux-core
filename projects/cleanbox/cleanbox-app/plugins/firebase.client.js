import { defineNuxtPlugin } from "#app";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";

export default defineNuxtPlugin(() => {
  const {
    public: {
      firebaseApiKey,
      firebaseAuthDomain,
      firebaseProjectId,
      firebaseStorageBucket,
      firebaseMessagingSenderId,
      firebaseAppId,
      firebaseMeasurementId,
    },
  } = useRuntimeConfig();

  // ✅ Ensure only one Firebase app instance is initialized
  let app = getApps().length
    ? getApp()
    : initializeApp({
        apiKey: firebaseApiKey,
        authDomain: firebaseAuthDomain,
        projectId: firebaseProjectId,
        storageBucket: firebaseStorageBucket,
        messagingSenderId: firebaseMessagingSenderId,
        appId: firebaseAppId,
        measurementId: firebaseMeasurementId,
      });

  // ✅ Initialize Firebase Authentication
  const auth = getAuth(app);

  // ✅ Ensure anonymous sign-in if no user is logged in
  if (import.meta.client) {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        try {
          await signInAnonymously(auth);
          console.log("✅ Signed in anonymously.");
        } catch (error) {
          console.error(
            "❌ Anonymous sign-in failed:",
            error?.message || "Unknown error"
          );
        }
      }
    });
  }
});
