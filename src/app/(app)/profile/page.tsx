import { createSessionClient } from "@/actions/appwrite";
import { DB_ID, account, database, serverAccount, storage } from "@/utils/appWrite";
import { Button } from "@radix-ui/themes";
import { Models, Query } from "appwrite";
import React, { useEffect, useState } from "react";
const getUser = async () => {
  const { account } = await createSessionClient();
  const user = await account.get();
  return user;
};
const getRupees = async (user: any) => {
  if (user.$id == undefined) {
    return;
  }
  // console.log(user.$id);
  const rupees = await database.listDocuments(DB_ID, "rupees", [Query.equal("users", user.$id)]);
  // console.log(rupees);
  return rupees;
};
const ProfilePage = async () => {
  const user = await getUser();

  return (
    <div className="container mx-auto py-8 ">
      {/* {JSON.stringify(user)} */}
      <div className="border p-4 flex gap-4 items-center">
        <img src={"https://ui-avatars.com/api/?background=random&width=800&name=" + user.name} className="rounded-full h-32" alt="" />
        <div>
          <h3 className="font-bold text-xl">{user.name}</h3>
          <p className="opacity-70">{user.email}</p>
          <Button className="mt-4 cursor-pointer" color="red">
            Change Password
          </Button>
        </div>
      </div>
      <section className="mt-10">
        <h3 className="font-bold text-3xl">My Rupees</h3>
        {/* <div className="gap-4 grid grid-cols-4 mt-4">
          {rupees?.documents?.map((rupee) => {
            return (
              <div key={rupee.$id} className="border p-4">
                <img src={storage.getFilePreview("rupees", rupee.image_id).href} alt="" className="aspect-video w-full rounded" />
                <div className="mt-2">
                  <h3 className="font-bold">{rupee.serialNumber}</h3>
                  <p className="text-sm opacity-40"> By, {rupee.users?.name}</p>
                </div>
              </div>
            );
          })}
        </div> */}
      </section>
    </div>
  );
};

export default ProfilePage;
