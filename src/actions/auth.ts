"use server";

import { account } from "@/utils/appWrite";

export const login = async (data: any) => {
  const session = await account.createEmailPasswordSession(data.email, data.password);
  console.log(session);
  return session;
};
