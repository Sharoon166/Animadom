import React from "react";
import Link from "next/link";

const SignUpPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-gradient-to-tr from-[#121212] via-[#292929] to-[#101010] shadow-lg flex flex-col md:flex-row items-center rounded-lg max-w-4xl w-full">
        <div className="md:w-1/2 w-full">
          <img
            src="/singup.png"
            alt="Sign Up Image"
            className="object-cover w-full h-full rounded-t-lg md:rounded-l-lg md:rounded-t-none"
          />
        </div>
        <div className="md:w-1/2 w-full p-8">
          <h2 className="text-3xl font-bold mb-6 text-center md:text-left">Sign Up</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="username" className="block font-semibold pb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none text-[#333]"
                placeholder="Choose a username"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block font-semibold pb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none text-[#333]"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block font-semibold pb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none text-[#333]"
                placeholder="Enter your password"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block font-semibold pb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none text-[#333]"
                placeholder="Confirm your password"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-slate-600 text-yellow-400 font-bold rounded-md hover:bg-slate-500 transition-colors duration-300"
            >
              Sign Up
            </button>
            <div className="text-center mt-4">
              <Link href="/login" className='hover:underline transition-all duration-100 text-yellow-400 text-md hover:text-yellow-300'>
                Already have an account? Log In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
