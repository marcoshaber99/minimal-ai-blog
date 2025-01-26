export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="py-8">
      <div className="container mx-auto px-4 max-w-4xl">{children}</div>
    </div>
  );
}
