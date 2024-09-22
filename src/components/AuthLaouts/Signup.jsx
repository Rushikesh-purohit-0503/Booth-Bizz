import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
import AuthService from "../../firebase/Authentication";
import { Link, useNavigate } from "react-router-dom";
import googleImg from "../../assets/googleImg.png"
import AuthHeader from "./AuthHeader";
const SignUp = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const password = watch("password");
    const onSubmit = async (data) => {
        try {
            const userCredential = await AuthService.createAccount({
                userName: data.username,
                email: data.email,
                password: data.password,
            });
            console.log(userCredential)
            if (userCredential) {
                const {displayName ,uid, email } = userCredential; // Now userCredential should be defined
                dispatch(login({ userData: { uid, email, userName :displayName} }));
                navigate('/');
            }
        } catch (error) {
            console.error("Error signing up", error);
        }
    };

    const handleGoogleSignUp = async () => {
        try {
            const userCredential = await AuthService.authentication(); // Google Sign-Up
            dispatch(login({ userData: userCredential }));
            navigate('/');
        } catch (error) {
            console.error("Error with Google sign-up", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <AuthHeader />

            <main className="flex-grow flex items-center justify-center px-4">
                <div className="max-w-md w-full">

                    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-md">
                        <h3 className="text-2xl font-bold mb-6 text-center">Sign Up</h3>
                        <div className="mb-6">
                            <label className="block text-gray-700 mb-2">Username</label>
                            <input
                                {...register("username", { required: true })}
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Enter username"
                            />
                        </div>
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
                                placeholder="Enter email"
                                type="email"
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 mb-2">Password</label>
                            <input
                                {...register("password", { required: true })}
                                placeholder="Enter password"
                                type="password"
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 mb-2">Confirm Password</label>
                            <input
                                {...register("confirmPassword", {
                                    required: true,
                                    validate: (value) => (value === password || "Passwords do not match")
                                })}
                                type="password"
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Confirm your password"
                            />
                            {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-red-300 text-black py-2 rounded hover:bg-[#f87a6e] transition duration-300"
                        >
                            Sign Up
                        </button>
                        <div className="mt-4 text-center">
                            <p className="text-sm">
                                Already have an account?{" "}
                                <Link to="/signin" className="text-red-400 font-medium hover:underline">
                                    Sign In {" "}
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
                                onClick={handleGoogleSignUp}
                                className="w-full flex justify-center items-center bg-red-300 text-black py-2 rounded transition duration-300 hover:bg-[#f87a6e]"
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

export default SignUp;
