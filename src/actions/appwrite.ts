"use server";

import { cookies } from "next/headers";
import { Account, Client, Databases } from "node-appwrite";

export async function createSessionClient() {
  const client = new Client().setEndpoint("https://appwrite.oswinjerome.in/v1").setProject("665b4d2f001f172200d1");
  const session = cookies().get("my-custom-session");
  if (!session || !session.value) {
    throw new Error("No session");
  }
  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
    get database() {
      return new Databases(client);
    },
  };
}

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint("https://appwrite.oswinjerome.in/v1")
    .setProject("665b4d2f001f172200d1")
    .setKey("dddb67f504f96e93b68ab44cdd8e431ba610365d0a33a2f20105b39e1c0f1225a14e9627224ad12804567d3431ea2b6b2bb4f7fe4b1e987715116b4131bccd3123fd6d6ce5c8618810616abe693220205ce8b74b5bd33184a81695821a968e104636b3c65dfd26a95df5726e910e7c450ec065c7f297c3487d6472c0b54b0390");

  return {
    get account() {
      return new Account(client);
    },
  };
}
