import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

export default function Admin() {
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
      if (token.role !== "Admin") {
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
      <h1>Administrador</h1>
    </div>
  );
}
