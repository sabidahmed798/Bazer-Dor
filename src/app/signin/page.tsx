"use client";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const SignInPage = () => {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };
    // console.log(data);

    const { data, error } = await authClient.signIn.email({
      ...user,
      callbackURL: "/",
    });

    if (data) {
      toast.success("সফলভাবে সাইন ইন হয়েছে");
      redirect("/");
    }
    if (error) {
      toast.error("সাইন ইন করা যায়নি");
      console.log(error);
    }
  };

  const handleGoogleSignIn = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
    console.log(data);
  };

  const handleGithubSignIn = async () => {
    const data = await authClient.signIn.social({
      provider: "github",
    });
    console.log(data);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f1f5ef] px-4 py-10">
      <h1 className="text-2xl font-bold text-[#252a24]">সাইন ইন</h1>

      <p className="mt-2 text-center text-xs leading-5 text-gray-500">
        বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
      </p>

      <form onSubmit={onSubmit} className="mt-5 w-full max-w-md">
        <fieldset className="w-full rounded-2xl border border-[#e6ebe4] bg-white p-5 shadow-sm sm:p-6">
          <label className="mb-1 block text-xs font-medium text-gray-700">
            ইমেইল
          </label>

          <input
            name="email"
            type="email"
            className="h-9 w-full rounded-lg border border-gray-200 bg-[#fbfcfa] px-3 text-xs outline-none transition focus:border-[#05893e] focus:ring-2 focus:ring-[#05893e]/10"
            placeholder="you@example.com"
            required
          />

          <label className="mb-1 mt-4 block text-xs font-medium text-gray-700">
            পাসওয়ার্ড
          </label>

          <input
            name="password"
            type="password"
            className="h-9 w-full rounded-lg border border-gray-200 bg-[#fbfcfa] px-3 text-xs outline-none transition focus:border-[#05893e] focus:ring-2 focus:ring-[#05893e]/10"
            placeholder="কমপক্ষে ৮ অক্ষর"
            minLength={8}
            required
          />

          <button
            type="submit"
            className="mt-4 h-9 w-full rounded-lg bg-[#05893e] text-xs font-semibold text-white shadow-[0_3px_5px_rgba(5,137,62,0.2)] transition hover:bg-[#047a36]"
          >
            সাইন ইন
          </button>
        </fieldset>
      </form>

      <div className="mt-4 flex w-full max-w-md justify-center gap-2">
        {/* Google Sign In */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="flex h-9 min-w-0 flex-1 items-center justify-center gap-1 rounded-lg border border-gray-200 bg-white px-2 text-[10px] font-medium text-gray-800 shadow-sm transition hover:bg-gray-50 sm:text-xs"
        >
          <Image
            className="h-4 w-4 shrink-0 object-contain"
            src="/google.png"
            alt="Google Logo"
            width={100}
            height={100}
          />

          <span className="whitespace-nowrap">Google দিয়ে চালিয়ে যান</span>
        </button>

        {/* GitHub Sign In */}
        <button
          type="button"
          onClick={handleGithubSignIn}
          className="flex h-9 min-w-0 flex-1 items-center justify-center gap-1 rounded-lg border border-gray-200 bg-white px-2 text-[10px] font-medium text-gray-800 shadow-sm transition hover:bg-gray-50 sm:text-xs"
        >
          <Image
            className="h-4 w-4 shrink-0 object-contain"
            src="/github.png"
            alt="GitHub Logo"
            width={50}
            height={50}
          />

          <span className="whitespace-nowrap">GitHub দিয়ে চালিয়ে যান</span>
        </button>
      </div>

      <p className="mt-4 text-xs text-gray-600">
        অ্যাকাউন্ট নেই?{" "}
        <span className="cursor-pointer font-medium text-[#05893e]">
          সাইন আপ করুন
        </span>
      </p>

      <p className="mt-5 text-xs text-gray-500">
        <a href={"/"} className="transition hover:text-[#05893e]">
          ← হোম পেজে ফিরে যান
        </a>
      </p>
    </div>
  );
};

export default SignInPage;
