import "server-only";

import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { cache } from "react";
import { redirect } from "next/navigation";

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("token")?.value;
  const session = await decrypt(cookie);

  if (!session?.id) {
    redirect("/auth");
  }

  return { isAuth: true, user: session };
});
