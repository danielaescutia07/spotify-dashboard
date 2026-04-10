import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import SignOutButton from "./SignOutButton";

interface Artist {
  name: string;
}

interface Track {
  name: string;
  artists: Artist[];
}

interface RecentlyPlayedItem {
  track: Track;
}

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const response = await fetch(
    "https://api.spotify.com/v1/me/player/recently-played?limit=10",
    {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    },
  );

  const data = await response.json();

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">🎵 Recently Played</h1>
        <SignOutButton />
      </div>
      <ul className="space-y-4">
        {data.items?.map((item: RecentlyPlayedItem, index: number) => (
          <li key={index} className="flex items-center gap-4">
            <span className="text-gray-400 w-6">{index + 1}</span>
            <span>{item.track.name}</span>
            <span className="text-gray-400">
              — {item.track.artists[0].name}
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
}
