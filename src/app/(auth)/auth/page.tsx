import LoginForm from "@/components/loginForm/LoginForm";
import React from "react";

export default function Login() {
  return (
    <main className="flex-1 min-h-full relative flex items-center justify-center">
      <div className="absolute inset-0 flex">
        <div className="w-1/2 h-full bg-[#C8A8CE]"></div>
        <div className="w-1/2 h-full bg-white"></div>
      </div>
      <section className="card bg-base-100 w-[35rem] shadow-2xl px-4 py-10 rounded-3xl">
        <div className="card-body flex flex-col gap-3">
          <h2 className="text-xl">Bienvenido.</h2>
          <h3 className="card-title text-5xl">Iniciar Sesión.</h3>
          <LoginForm />
        </div>
      </section>
    </main>
  );
}
