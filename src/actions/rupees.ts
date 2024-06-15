"use server";

import { DB_ID, serverDatabase, storage } from "@/utils/appWrite";
import { createSessionClient } from "./appwrite";
import { ID } from "appwrite";

export const createRupee = async ({ image, serialNumber }: { image: string; serialNumber: string }) => {
  const { account, database } = await createSessionClient();
  const user = await account.get();
  const rupee = await database.createDocument(DB_ID, "rupees", ID.unique(), {
    serialNumber,
    image_id: image,
    users: user.$id,
  });
  return rupee;
};
