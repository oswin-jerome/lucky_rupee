"use client";

import { useRouter, useSearchParams } from "next/navigation";
import _ from "lodash";
import { useCallback } from "react";
const SearchBar = () => {
  const router = useRouter();
  const search = useSearchParams();
  const handleSearch = (serialNumber: string) => {
    router.push("/search?serialNumber=" + serialNumber, {});
  };
  const deb = useCallback(_.debounce(handleSearch, 300), []);

  return (
    <input
      onChange={(e) => {
        deb(e.target.value);
      }}
      type="text"
      defaultValue={search.get("serialNumber") ?? ""}
      placeholder="Enter Serial Number"
      className="w-full p-3 text-gray-800 rounded-lg border "
    />
  );
};

export default SearchBar;
