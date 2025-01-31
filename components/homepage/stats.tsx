const stats = [
  { id: 1, name: "Active Writers", value: "500+" },
  { id: 2, name: "Articles Published", value: "2,000+" },
  { id: 3, name: "Monthly Readers", value: "100,000+" },
];

export function Stats() {
  return (
    <div className="relative isolate bg-background py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Trusted by developers worldwide
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Join our growing community of developers learning and sharing
              knowledge
            </p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col p-8 bg-muted/50">
                <dt className="text-sm leading-6 text-muted-foreground">
                  {stat.name}
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
