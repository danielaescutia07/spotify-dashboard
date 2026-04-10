"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="bg-green-500 hover:bg-green-400 text-black font-bold py-3 px-8 rounded-full transition-colors"
    >
      Sign out
    </button>
  );
}
