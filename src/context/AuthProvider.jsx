import {
  applyActionCode,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import PropTypes from "prop-types";
import app from "../firebase/firebase.config";

export const AuthContext = createContext();

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signInWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const updateUser = (name) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
    });
  };
  const logout = () => {
    setLoading(true);
    window.localStorage?.removeItem("isHost");
    window.localStorage?.removeItem("isAdmin");
    console.log("click");
    return signOut(auth);
  };
  const handleForgotPassword = async (email) => {
    if (!email) {
      return;
    }
    try {
      sendPasswordResetEmail(auth, email, {
        url: "http://localhost:5173/reset-password",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const passwordReset = (oobCode, password) => {
    return confirmPasswordReset(auth, oobCode, password);
  };
  const handleCustomEmailVerification = async (user) => {
    try {
      await sendEmailVerification(user);
      await logout();
    } catch (err) {
      console.log(err);
    }
  };
  const handleVerifyEmail = async (actionCode, continueUrl) => {
    try {
      await applyActionCode(auth, actionCode);
      // Email address has been verified.
      console.log("Email address has been verified.");

      // TODO: Display a confirmation message to the user.
      // You could also provide the user with a link back to the app.

      // TODO: If a continue URL is available, redirect the user back to the app via continueUrl.
      if (continueUrl) {
        window.location.href = continueUrl;
      }
    } catch (error) {
      // Code is invalid or expired. Ask the user to verify their email address again.
      console.error("Email verification failed:", error.message);
    }
  };

  const authInfo = {
    createUser,
    signInWithGoogle,
    signIn,
    updateUser,
    logout,
    user,
    loading,
    handleForgotPassword,
    passwordReset,
    handleCustomEmailVerification,
    // sendEmailVerification,
    // verifyEmail,
    // sendEmailVerificationLink,
    handleVerifyEmail,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.shape({
    children: PropTypes.any,
  }),
};

export default AuthProvider;
