// src/app/signin/page.tsx
"use client"

import { useState } from "react";
import { api } from "../../../../lib/axios";
import { useUserStore } from "../../../../store/store";
import { useRouter } from "next/navigation";

export default function page() {
  
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const {setUser} =useUserStore.getState();
    const navigate=useRouter();
    
    const handleSingup=async(e:React.FormEvent)=>{
      e.preventDefault();
      try{
 
      const response=await api.post("/auth/login",{email,password});
      setUser(response.data.data)
      navigate.push("/dashboard")
      }catch(err){
        console.log(err);
      }
      
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-black text-3xl font-bold">
          Sign In
        </h1>

        <p className="mb-6 text-center text-gray-500">
          Welcome back! Please login to continue.
        </p>

        <form onSubmit={handleSingup} className="space-y-4">
          <div>
            <label className="mb-1 block text-black text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full text-black rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="mb-1 text-black block text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full text-black rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-black"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg  bg-black py-2 text-white transition hover:opacity-90"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="font-medium text-black underline"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}