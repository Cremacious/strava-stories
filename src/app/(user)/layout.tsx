export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
      <div></div>
      <div className="lg:col-span-2">{children}</div>
      <div></div>
    </div>
  );
}
