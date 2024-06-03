"use client";

import { DB_ID, database, storage } from "@/utils/appWrite";
import { Models, Query } from "appwrite";
import { useEffect, useState } from "react";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Models.Document[]>([]);

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  const handleSearch = async () => {
    // e.preventDefault();
    const res = (await database.listDocuments(DB_ID, "rupees", [Query.contains("serialNumber", searchTerm)])).documents;
    console.log(res);
    setSearchResults(res);
  };
  return (
    <div className="">
      <div className=" py-8">
        <div className="max-w-md mx-auto">
          <input onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder="Enter Serial Number" className="w-full p-3 text-gray-800 rounded-lg border " />
        </div>
      </div>
      <div className="container grid grid-cols-3 gap-8 mt-8">
        {searchResults.map((res) => {
          storage.getFilePreview("rupees", res.image_id).href;
          console.log(storage.getFilePreview("rupees", res.image_id, 400, 300).href);
          return (
            <div key={res.$id}>
              <img src={storage.getFilePreview("rupees", res.image_id).href} alt="" className="aspect-video w-full rounded" />
              <h3 className="font-bold">{res.serialNumber}</h3>
              <p>{res.user?.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchPage;
