"use client";
import React, { useRef } from "react";
import Form from "../form/Form";
import Input from "../input/Input";
import Button from "../button/Button";
import AuthService from "@/requests/Auth";
import { redirect } from "next/navigation";

export default function LoginForm() {
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  function onSubmit() {
    if (!usernameRef.current || !passwordRef.current) {
      return;
    }
    AuthService.login({
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    })
      .then((res: unknown) => {
        console.log(res);
        redirect("/");
      })
      .catch((err: unknown) => {
        console.log(err);
      });
  }

  return (
    <Form onSubmit={onSubmit}>
      <Input
        type="text"
        placeholder="Usuario"
        label="Ingresar usuario:"
        name="username"
        ref={usernameRef}
      />
      <Input
        type="password"
        placeholder="Contraseña"
        label="Ingresar contraseña:"
        ref={passwordRef}
      />
      <div className="pt-12" />
      <Button text="Iniciar sesión" />
      <div className="pb-24" />
    </Form>
  );
}
