// src/app/signup/page.tsx
"use client"
import { useState } from "react";
import { api } from "../../../../lib/axios";

export default function SignUpPage() {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [cpassword,setCpassword]=useState("");
  const handleSingup=async(e:React.FormEvent)=>{
    e.preventDefault();
    try{
if(password!==cpassword){
      alert("please entrer the password")
      return;
    }
    const response=await api.post("/auth/register",{name,email,password});
    console.log(response.data);
    }catch(err){
      console.log(err);
    }
    
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-black text-center text-3xl font-bold">
          Create Account
        </h1>

        <p className="mb-6  text-center text-gray-500">
          Sign up to start managing your household inventory.
        </p>

        <form onSubmit={handleSingup} className="space-y-4" >
          <div>
            <label className="mb-1  text-black block text-sm font-medium">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              onChange={(e)=>setName(e.target.value)}
              className="w-full text-black rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="mb-1 text-black block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full text-black rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="mb-1 text-black block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              placeholder="Create a password"
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full text-black rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="mb-1 text-black block text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              onChange={(e)=>setCpassword(e.target.value)}
              placeholder="Confirm your password"
              className="w-full text-black rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-black"
            />
          </div>

          <button
            type="submit"
           
            className="w-full rounded-lg bg-black py-2 text-white transition hover:opacity-90"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/signin"
            className="font-medium text-black underline"
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}