import { currentUser } from "@clerk/nextjs/server";
import { Hero } from "@/components/homepage/hero";
import { Features } from "@/components/homepage/features";

export default async function Home() {
  const user = await currentUser();

  return (
    <div className="relative">
      <Hero user={user} />
      <Features />
    </div>
  );
}
