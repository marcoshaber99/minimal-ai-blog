import { Book, Brain, Share2 } from "lucide-react";
import Image from "next/image";

const features = [
  {
    name: "Learn",
    description:
      "Access high-quality technical content written by developers for developers.",
    icon: Book,
  },
  {
    name: "Understand",
    description:
      "Grasp complex concepts through clear explanations and practical examples.",
    icon: Brain,
  },
  {
    name: "Share",
    description:
      "Contribute your knowledge and help others in their learning journey.",
    icon: Share2,
  },
];

export function Features() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            Why Vivlio?
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl relative">
            <Image
              src="/assets/new-logo.svg"
              width={30}
              height={30}
              alt="Logo"
              className="hidden md:block absolute -left-3 top-1/2 -translate-y-1/2 transform -rotate-12 opacity-90 logo-glow"
            />
            Everything you need to grow as a developer
            <Image
              src="/assets/new-logo.svg"
              width={30}
              height={30}
              alt="Logo"
              className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 transform rotate-12 opacity-90 logo-glow"
            />
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                  <feature.icon
                    className="h-5 w-5 flex-none text-primary text-orange-600 dark:text-yellow-400"
                    aria-hidden="true"
                  />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
