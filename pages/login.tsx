import React from 'react';
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(true);

    const validateEmail = (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsValidEmail(emailRegex.test(value));
        setEmail(value);
    }

    const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLoading(true)
        try {
            const res = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (res?.ok) {
                alert("Successfully logged in!");
                router.push("/");
            } else {
                alert("Invalid credentials");
            }
        } catch (error) {
            console.error("Error during sign in:", error);
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className='flex h-screen'>
            <div className='flex-1 bg-white h-full flex items-center justify-center'>
                <div className='w-full max-w-[576px]'>
                    <div className='py-32'>
                        <h3 className='font-bold text-[20px] leading-[125%] tracking-[0%] mb-6'>Welcome back</h3>
                        <div className="mb-4">
                            <label htmlFor="email" className="text-gray-900 font-medium text-[14px] leading-[150%] tracking-[0%] block mb-1">
                                Email
                            </label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => validateEmail(e.target.value)}
                                placeholder="name@example.com"
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="text-gray-900 font-medium text-[14px] leading-[150%] tracking-[0%] block mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='••••••••••'
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex items-center mb-6">
                            <input type="checkbox" id="remember" className="w-[16px] h-[16px] rounded-[4px] border-[0.5px] border-gray-300 bg-gray-50 opacity-100 mr-2 hover:cursor-pointer" />
                            <label htmlFor="remember" className="text-sm text-gray-700">Remember me</label>
                        </div>
                        <button
                            type='button'
                            className="w-full bg-blue-700 text-white py-2 rounded-lg text-sm hover:bg-blue-500 hover:cursor-pointer transition disabled:bg-blue-400 disabled:cursor-not-allowed"
                            onClick={handleLogin}
                            disabled={loading || !email || !password || !isValidEmail}
                        >
                            {loading? "Loading..." : "Sign in"}
                        </button>
                    </div>
                    <p className="text-gray-300 font-inter font-normal text-center text-[14px] leading-[150%] tracking-[0%]">© 2024 tentwenty</p>
                </div>
            </div>

            <div className='flex-1 bg-blue-600 h-full flex flex-col items-center justify-center'>
                <div className='max-w-[576px] text-wrap'>
                    <h1 className='text-white font-semibold text-[40px] leading-[150%] tracking-[0%] mb-4'>ticktock</h1>
                    <p className='text-gray-200 font-normal text-[16px] leading-[150%] tracking-[0%]'>
                        Introducing ticktock, our cutting-edge timesheet web application designed to revolutionize how you manage employee work hours. With ticktock, you can effortlessly track and monitor employee attendance and productivity from anywhere, anytime, using any internet-connected device.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login