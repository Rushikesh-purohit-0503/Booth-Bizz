import React,{useState} from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
import AuthService from "../../firebase/Authentication";
import { Link, useNavigate } from "react-router-dom";
import googleImg from "../../assets/googleImg.png"
import AuthHeader from "./AuthHeader";
const SignIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data) => {
    setErrorMessage('')
    try {
      const userCredential = await AuthService.login({
        email: data.email,
        password: data.password,
      });
      console.log("userCredential:", userCredential);

      if(userCredential && userCredential.user){
      const{uid,email,displayName}=userCredential.user;
      dispatch(login({ userData: {uid,email,userName:displayName} }));
      navigate('/')
      }
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        setErrorMessage('Incorrect password. Please try again.');
      } else if (error.code === 'auth/user-not-found') {
        setErrorMessage('No account found with this email.');
      } else if (error.code === 'auth/invalid-email') {
        setErrorMessage('Invalid email format.');
      } else {
        setErrorMessage('Failed to sign in. Please try again later.');
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const userCredential = await AuthService.authentication();
       // Google Sign-In
      dispatch(login({ userData: userCredential }));
      navigate('/')
    } catch (error) {
      console.error("Error with Google sign-in", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <AuthHeader/>
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="max-w-md w-full">

          <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-6 text-center">Sign In</h3>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                {...register("email", {
                  required: true,
                  validate: {
                    matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([._-]?\w+)*(\.\w{2,3})+$/.
                      test(value) || "Email address must be a valid address",
                  }
                })}
                type="email"
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                {...register("password", { required: true })}
                type="password"
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <button
              type="submit"
              className="w-full bg-red-300 text-black py-2 rounded hover:bg-red-400 transition duration-300"
            >
              Sign In
            </button>
            <div className="mt-4 text-center">
              <p className="text-sm">
                Don't have an account?{" "}
                <Link to="/signup" className="text-red-400 font-medium hover:underline">
                  Sign up {" "}
                </Link>
                
              </p>
            </div>
            {/* Code for line And "OR" */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 bg-white text-sm text-gray-500">OR</span>
              </div>
            </div>
            <div className="mt-4">
              <button
                onClick={handleGoogleSignIn}
                className="w-full flex justify-center items-center bg-red-300 text-black py-2 rounded transition duration-300 hover:bg-red-400"
              >
                <img src={googleImg} alt="Google sign-in" className="w-6 h-6 mr-2" /> {/* Adjust image size and add margin-right */}
                Continue with Google{/* Text label for the button */}
             
              </button>
            </div>
            
          </form>

        </div>
      </main>
    </div>
  );
};

export default SignIn;