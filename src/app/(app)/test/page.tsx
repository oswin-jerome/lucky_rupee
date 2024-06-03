import { DB_ID, database } from "@/utils/appWrite";

const TestPage = async () => {
  const data = await database.listDocuments(DB_ID, "rupees");
  console.log(data);
  return (
    <div>
      <h1>Test</h1>
    </div>
  );
};

export default TestPage;
