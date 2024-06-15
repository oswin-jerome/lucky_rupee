import { Account, Client, Databases, Storage } from "appwrite";
export const client = new Client();

client.setEndpoint("https://appwrite.oswinjerome.in/v1").setProject("665b4d2f001f172200d1");

export const database = new Databases(client);
export const account = new Account(client);

export const DB_ID = "dev";

const sdk = require("node-appwrite");

export const serverSdk = new sdk.Client();
export const serverAccount = new sdk.Account(client);
export const storage = new Storage(client);
serverSdk
  .setEndpoint("https://appwrite.oswinjerome.in/v1") // Your API Endpoint
  .setProject("665b4d2f001f172200d1") // Your project ID
  .setKey("dddb67f504f96e93b68ab44cdd8e431ba610365d0a33a2f20105b39e1c0f1225a14e9627224ad12804567d3431ea2b6b2bb4f7fe4b1e987715116b4131bccd3123fd6d6ce5c8618810616abe693220205ce8b74b5bd33184a81695821a968e104636b3c65dfd26a95df5726e910e7c450ec065c7f297c3487d6472c0b54b0390") // Your secret API key
  .setSelfSigned(); // Use only on dev mode with a self-signed SSL cert
