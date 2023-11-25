import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Home() {
  const hasTokenCookie = cookies().has("token");
  if (!hasTokenCookie) {
    redirect("/login");
  } else {
    const roleCookie = cookies().get("role");
    redirect(`/${roleCookie?.value.toLowerCase()}`);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
      <h1>Main Page</h1>
    </main>
  );
}
