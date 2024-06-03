import { Account, Client, Databases, Storage } from "appwrite";
export const client = new Client();

client.setEndpoint("http://localhost:81/v1").setProject("665b2973001d383b3e15");

export const database = new Databases(client);
export const account = new Account(client);

export const DB_ID = "dev";

const sdk = require("node-appwrite");

export const serverSdk = new sdk.Client();
export const serverAccount = new sdk.Account(client);
export const storage = new Storage(client);
serverSdk
  .setEndpoint("http://localhost:81/v1") // Your API Endpoint
  .setProject("665b2973001d383b3e15") // Your project ID
  .setKey("8a940bb5f60af414f09e24ed6622fab829190eeb3fecb25da9e73ef907bae6db512f1ce7d8f470a469da808c678d138b33b0b51b2cc695ff35a42b2e57ceeed7de6dbba09fb3e1bad1d86ff55d3f68708a2712d9914023fe606081771f04de703f770c503127a65d2d15a9b43e099a1f8cf3070265bc5fb11f67d0d49ce10d4d") // Your secret API key
  .setSelfSigned(); // Use only on dev mode with a self-signed SSL cert
