import Header from "./header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <div className="h-20 z-0 w-full"></div>
      {children}
    </div>
  );
}
