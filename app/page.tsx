import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
        <h1 className="text-4xl font-bold mb-4">🎵 My Spotify Dashboard</h1>
        <p className="text-green-400 mb-8">
          Logged in as {session.user?.name}!
        </p>
        <Link
          href="/dashboard"
          className="bg-green-500 hover:bg-green-400 text-black font-bold py-3 px-8 rounded-full transition-colors"
        >
          Go to Dashboard
        </Link>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-bold mb-4">🎵 My Spotify Dashboard</h1>
      <p className="text-gray-400 mb-8">See your top tracks and artists</p>
      <Link
        href="/api/auth/signin"
        className="bg-green-500 hover:bg-green-400 text-black font-bold py-3 px-8 rounded-full transition-colors"
      >
        Login with Spotify
      </Link>
    </main>
  );
}
