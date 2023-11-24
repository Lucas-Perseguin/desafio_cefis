import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Home() {
  const hasTokenCookie = cookies().has("token");
  if (!hasTokenCookie) redirect("/login");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Main Page</h1>
    </main>
  );
}
