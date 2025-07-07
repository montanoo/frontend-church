// app/components/Header/HeaderServer.tsx
import { verifySession } from "@/utils/dal";
import HeaderClient from "./HeaderClient";

export default async function HeaderServer() {
  const { user } = await verifySession();

  return <HeaderClient user={user} />;
}
