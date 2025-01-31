import { currentUser } from "@clerk/nextjs/server";
import { Hero } from "@/components/homepage/hero";
import { Features } from "@/components/homepage/features";
//import { Stats } from "@/components/homepage/stats";

export default async function Home() {
  const user = await currentUser();

  return (
    <div className="relative">
      <Hero user={user} />
      <Features />
      {/* <Stats /> */}
    </div>
  );
}
