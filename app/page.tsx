import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  const { userId } = auth();

  if (userId) redirect("/notes");
  return (
    <div className="flex flex-col max-w-7xl h-screen justify-center items-center mx-auto">
      <p className="text-3xl md:text-6xl font-bold uppercase mb-5">note ai</p>
      <Button asChild size={"lg"}>
        <Link href="/notes">Get Start</Link>
      </Button>
    </div>
  );
}
