import { DB_ID, database, storage } from "@/utils/appWrite";
import { Models, Query } from "appwrite";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";

export const revalidate = 0;

const SearchPage = async (prop: any) => {
  const rupees = (await database.listDocuments(DB_ID, "rupees", [Query.contains("serialNumber", prop.searchParams.serialNumber ?? "")])).documents;
  console.log(rupees);
  return (
    <div className="">
      <div className=" py-8">
        <div className="max-w-md mx-auto">
          <SearchBar />
        </div>
      </div>
      <div className="container grid grid-cols-3 gap-8 mt-8">
        {rupees.map((rupee) => {
          storage.getFilePreview("rupees", rupee.image_id).href;
          return (
            <div key={rupee.$id} className="border p-4 rounded-lg">
              <img src={storage.getFilePreview("rupees", rupee.image_id).href} alt="" className="aspect-video w-full rounded" />
              <div className="mt-2">
                <h3 className="font-bold">{rupee.serialNumber}</h3>
                <p className="text-sm opacity-40"> By, {rupee.users?.name}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchPage;
