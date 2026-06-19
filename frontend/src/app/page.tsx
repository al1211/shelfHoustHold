"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../store/store";

export default function HomePage() {

  const router=useRouter();
  
  const user=useAuthStore((state:any)=>state.user)
     
     
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 border-b bg-white">
        <h1 className="text-2xl font-bold text-green-500">
          Expiry Tracker
        </h1>

        <div className="flex gap-4">
          <Link
            href="/signin"
            className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Sign In
          </Link>

          <Link
            href="/signup"
            className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <h2 className="text-5xl  font-bold text-black">
              Track Grocery Expiry Dates With Your Household
            </h2>

            <p className="mt-6 text-lg text-gray-600">
              Manage groceries together, receive expiry alerts,
              reduce food waste, and compete with roommates
              through a smart shared inventory system.
            </p>

            <div className="mt-8 flex gap-4">
              <Link
                href="/dashboard"
                className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700"
              >
                Go to Dashboard
              </Link>

              
            </div>
          </div>

          {/* Right */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h3 className="text-2xl text-stone-600 font-semibold mb-6">
              Dashboard Preview
            </h3>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-green-100 p-4 rounded-xl">
                <p className="text-sm text-gray-600">Fresh</p>
                <h4 className="text-3xl font-bold text-green-600">
                  15
                </h4>
              </div>

              <div className="bg-yellow-100 p-4 rounded-xl">
                <p className="text-sm text-gray-600">
                  Expiring
                </p>
                <h4 className="text-3xl font-bold text-yellow-600">
                  3
                </h4>
              </div>

              <div className="bg-red-100 p-4 rounded-xl">
                <p className="text-sm text-gray-600">Expired</p>
                <h4 className="text-3xl font-bold text-red-600">
                  1
                </h4>
              </div>
            </div>

            <div className="mt-6 border rounded-xl p-4">
              <h4 className="font-semibold mb-3 text-stone-500">
                Household Waste Score
              </h4>

              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                <div className="w-[84%] h-full bg-green-500"></div>
              </div>

              <p className="mt-2 text-sm text-gray-600">
                84% efficiency
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-3xl text-black font-bold text-center mb-10">
          Features
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="font-semibold text-black text-xl mb-2">
              Shared Household
            </h3>
            <p className="text-gray-600">
              Create or join households using invite
              codes.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="font-semibold  text-black text-xl mb-2">
              Expiry Alerts
            </h3>
            <p className="text-gray-600">
              Receive notifications before food expires.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="font-semibold text-black text-xl mb-2">
              Waste Tracking
            </h3>
            <p className="text-gray-600">
              Compete with roommates and reduce waste.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}