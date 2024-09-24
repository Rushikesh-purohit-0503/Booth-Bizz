import { auth, db, provider, signInWithPopup, updateProfile } from "./conf";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore"; // Import setDoc and doc
class AuthService {
  async authentication() {
    try {
      const userCredentials = await signInWithPopup(auth, provider);

      return userCredentials.user;
    } catch (error) {
      console.error("Error Signing in with Google", error);
      throw error; // Re-throw the error to handle it where this method is called
    }
  }

  async createAccount({ userName ,email, password }) {
    try {
      const userAccount = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user=userAccount.user
      await updateProfile(user, { displayName: userName });

      // Step 3: Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        username: userName,
      });
      return user;
    } catch (error) {
      console.error("Error creating account", error);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredentials;
    } catch (error) {
      console.error("Error logging in", error);
      throw error;
    }
  }

  async logout() {
    try {
      await signOut(auth);
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  }

  async getCurrentUser() {
    return auth.currentUser;
  }

  onAuthChange(callback) {
    onAuthStateChanged(auth, (user) => {
      callback(user);
    });
  }
}

const authService = new AuthService();
export default authService;
