import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token");

  if (true) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50">
      <h1 className="text-5xl font-bold">
        ShelfLife
      </h1>

      <p className="mt-4 text-gray-600">
        Manage your household inventory efficiently.
      </p>

      <div className="mt-8 flex gap-4">
        <a
          href="/signin"
          className="rounded-lg bg-black px-6 py-3 text-white"
        >
          Sign In
        </a>

        <a
          href="/signup"
          className="rounded-lg border px-6 py-3"
        >
          Sign Up
        </a>
      </div>
    </div>
  );
}