import { DB_ID, database } from "@/utils/appWrite";
import { Button, Text } from "@radix-ui/themes";
import { Models } from "appwrite";

type Name = Models.Document & {
  name?: string;
};

export default async function Home() {
  const data: Name[] = (await database.listDocuments(DB_ID, "names")).documents;

  return (
    <main className="">
      {data.map((e) => {
        return <div>{e.name}</div>;
      })}
    </main>
  );
}
