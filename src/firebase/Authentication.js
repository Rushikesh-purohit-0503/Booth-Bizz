import { auth, provider, signInWithPopup } from "./conf";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword , onAuthStateChanged, getAuth ,signOut} from "firebase/auth";
class authService {
  async authentication() {
    try {
      const userCredentials=await signInWithPopup(auth, provider);
      return userCredentials.user;
    } catch (error) {
      console.error("Error Signing in", error);
    }
  }
  async createAccount({ email, password }) {
    try {
      const userAccount = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userAccount.user;
    } catch (error) {
      console.error("Error creating account", error);
    }
  }

  async login({email,password}){
    try {
      const auth=new getAuth()
      console.log("Current auth user: ",auth.currentUser);
      
      const userCredentials = await signInWithEmailAndPassword(auth,email,password);
      return userCredentials;
    } catch (error) {
      console.error("Error login", error);
    }
  }

  async logout(){
    try {
      await signOut(auth);
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Error logout", error);
    }
  }
  async getCurrentUser(){
    return  auth.currentUser;
  }
  
  onAuthChange(callback) {
    onAuthStateChanged(auth, (user) => {
      callback(user);
    });
  }
}
const authservice = new authService();
export default authservice;
