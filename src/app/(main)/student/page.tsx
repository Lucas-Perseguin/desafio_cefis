import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Student() {
  function logout() {
    cookies().delete("token");
    cookies().delete("name");
    cookies().delete("role");
    redirect("/login");
  }

  const tokenCookie = cookies().get("token");
  if (tokenCookie) {
    try {
      const token = jwt.verify(
        tokenCookie.value,
        `${process.env.JWT_SECRET}`
      ) as { name: String; role: String };
      if (token.role !== "Student") {
        logout();
      }
    } catch (error) {
      alert(
        "Ocorreu um erro na validação da sua conta, por favor faça o login novamente"
      );
      logout();
    }
  } else {
    logout();
  }

  return (
    <div>
      <h1>Estudante</h1>
    </div>
  );
}
