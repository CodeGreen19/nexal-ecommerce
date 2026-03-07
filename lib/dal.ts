import "server-only";
import { auth } from "./auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function getSession() {
  const res = await auth.api.getSession({ headers: await headers() });
  if (!res?.session) {
    redirect("/");
  }
  return res;
}
export async function getUserId() {
  const res = await auth.api.getSession({ headers: await headers() });

  if (!res?.user) {
    throw new Error("User not found");
  }
  return res.user.id;
}
