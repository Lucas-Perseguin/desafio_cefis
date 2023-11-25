"use client";

import { IoCloseCircleOutline, IoLogOutOutline, IoMenu } from "react-icons/io5";
import { getCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const [openModal, setOpenModal] = useState(false);
  const name = getCookie("name");
  const router = useRouter();

  function handleLogout() {
    deleteCookie("token");
    deleteCookie("name");
    deleteCookie("role");
    router.replace("/login");
  }

  return (
    <div className="fixed top-0 left-0 w-full h-20 bg-white z-10 border-b-2 flex items-center justify-between px-4">
      <IoMenu className="w-12 h-12 text-black hover:cursor-pointer" />
      <div className="flex gap-2 items-center relative">
        <p className="text-black text-lg">Olá, {name}!</p>
        <IoLogOutOutline
          className="w-10 h-10 text-black hover:cursor-pointer"
          onClick={() => setOpenModal(true)}
        />
        <div
          className={`absolute ${
            openModal ? "flex" : "hidden"
          } w-96 h-40 top-16 right-4 bg-white shadow-lg rounded-2xl pt-10 pb-4 px-3 justify-between items-center flex-col`}
        >
          <IoCloseCircleOutline
            className="absolute top-3 right-3 h-7 w-7 hover:cursor-pointer"
            onClick={() => setOpenModal(false)}
          />
          <p className="text-lg">Deseja sair da sua conta?</p>
          <button
            onClick={handleLogout}
            className="w-28 h-10 rounded-full bg-sky-700"
          >
            <p className="text-lg text-white">Confirmar</p>
          </button>
        </div>
      </div>
    </div>
  );
}
