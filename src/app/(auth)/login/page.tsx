"use client";

import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [sending, setSending] = useState(false);
  const router = useRouter();

  async function handleSubmit() {
    setSending(true);
    try {
      const res = await axios.post("/api/users/login", { name, password });
      const payload = jwt.decode(res.data.token) as {
        name: String;
        role: String;
      };
      setCookie("token", res.data.token, {
        secure: true,
        maxAge: 60 * 60 * 24 * 7,
      });
      setCookie("name", payload.name, {
        secure: true,
        maxAge: 60 * 60 * 24 * 7,
      });
      setCookie("role", payload.role, {
        secure: true,
        maxAge: 60 * 60 * 24 * 7,
      });
      router.push("/");
    } catch (error: any) {
      alert(error.response.data.message);
    }
    setSending(false);
    return;
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-white">
      <div className="w-full p-6 bg-white rounded-3xl shadow-xl lg:max-w-xl">
        <h1 className="text-3xl font-bold text-center text-gray-700">ENTRAR</h1>
        <div className="mt-6">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-800"
            >
              Nome
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-2">
            <button
              onClick={handleSubmit}
              disabled={sending}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Login
            </button>
          </div>
        </div>

        <p className="mt-4 text-sm text-center text-gray-700">
          Não possui uma conta?{" "}
          <Link
            href="/register"
            className="font-medium text-blue-600 hover:underline"
          >
            Registrar
          </Link>
        </p>
      </div>
    </div>
  );
}
