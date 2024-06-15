"use server";

import { account } from "@/utils/appWrite";
import { cookies } from "next/headers";
import { createAdminClient } from "./appwrite";
import { ID } from "appwrite";
import { redirect } from "next/navigation";

export const login = async (data: any) => {
  const session = await account.createEmailPasswordSession(data.email, data.password);
  console.log(session);
  return session;
};

export const loginWithSession = (session: string) => {
  console.log(session);
  cookies().set("my-custom-session", session, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });
};

export const signUpWithEmail = async ({ email, password, name }: { email: string; password: string; name: string }) => {
  "use server";

  const { account } = await createAdminClient();

  await account.create(ID.unique(), email, password, name);
  const session = await account.createEmailPasswordSession(email, password);

  cookies().set("my-custom-session", session.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });

  redirect("/login");
};
