import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      shakil
      <Link href="/job" className="bg-red-300 px-4 py-2 rounded-lg ml-5"   >JOBS</Link>
    </div>
  );
}
