"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  // Update Profile
  const handleUpdateProfile = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = String(formData.get("name") || "").trim();

    if (!name) {
      toast.error("আপনার নাম লিখুন");
      return;
    }

    try {
      setLoading(true);

      await authClient.updateUser({
        name,
      });

      toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে");
      setShow(false);
    } catch {
      toast.error("প্রোফাইল আপডেট করা যায়নি");
    } finally {
      setLoading(false);
    }
  };

  // Sign Out
  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      toast.success("সফলভাবে সাইন আউট হয়েছে");
    } catch {
      toast.error("সাইন আউট করা যায়নি");
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#f0f5ef] px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto w-full max-w-5xl">
        {/* Heading */}
        <header className="mb-6 sm:mb-8">
          <h1 className="text-xl font-bold text-[#26332d] sm:text-2xl">
            আমার প্রোফাইল
          </h1>

          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            আমার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </header>

        {/* Profile Card */}
        <section className="mb-5 flex flex-col gap-4 rounded-2xl border border-white/80 bg-white/80 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6">
          <div className="flex min-w-0 items-center gap-4 sm:gap-5">
            {/* Profile Image */}
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-16 sm:w-16">
              <Image
                src={
                  user?.image ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbP0ifhQjaZBJOYxSKE0q4uEtD5IV1gA_6IHtbExr6gA&s"
                }
                height={100}
                width={100}
                alt="Profile picture"
                className="h-full w-full object-cover"
              />
            </div>

            {/* User Information */}
            <div className="min-w-0">
              <h2 className="truncate text-base font-semibold text-[#26332d] sm:text-lg">
                {user?.name || "Rezwan Ahmed"}
              </h2>

              <h2 className="truncate text-base font-semibold text-[#26332d] sm:text-lg">
                {user?.email || "rezwanahmed@gmail.com"}
              </h2>

              {/* Email area intentionally left blank */}
              <div className="h-5 sm:h-6" />
            </div>
          </div>

          {/* Sign Out Button */}
          <button
            type="button"
            onClick={handleSignOut}
            className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-lg border border-red-400 bg-transparent px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 sm:w-auto sm:py-2.5"
          >
            <span
              onClick={handleSignOut}
              className=" text-red-500"
              aria-hidden="true"
            >
              ↩
            </span>
            সাইন আউট
          </button>
        </section>

        {/* Information Card */}
        <section className="rounded-2xl border border-white/80 bg-white/80 p-4 shadow-sm sm:p-6">
          <h2 className="mb-6 text-base font-semibold text-[#26332d]">তথ্য</h2>

          <form onSubmit={handleUpdateProfile}>
            {/* Name Field */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                নাম
              </label>

              <input
                id="name"
                name="name"
                type="text"
                defaultValue={user?.name || ""}
                placeholder="আপনার নাম লিখুন"
                required
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* Small Update Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-auto min-w-28 rounded-lg bg-[#078443] px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#066f38] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
};

export default ProfilePage;
