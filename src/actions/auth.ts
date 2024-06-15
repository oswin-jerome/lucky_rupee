"use server";

import { account } from "@/utils/appWrite";
import { cookies } from "next/headers";
import { createAdminClient, createSessionClient } from "./appwrite";
import { ID } from "appwrite";
import { redirect } from "next/navigation";

export const login = async (data: any) => {
  const session = await account.createEmailPasswordSession(data.email, data.password);
  console.log(session);
  return session;
};

export const loginWithSession = async ({ email, password }: { email: string; password: string }) => {
  const { account } = await createAdminClient();
  const session = await account.createEmailPasswordSession(email, password);

  cookies().set("my-custom-session", session.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });

  redirect("/");
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

  redirect("/");
};

export const logout = async () => {
  const { account } = await createSessionClient();

  cookies().delete("my-custom-session");
  await account.deleteSession("current");

  redirect("/auth/login");
};
