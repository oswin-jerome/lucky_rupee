import { Account, Client, Databases } from "appwrite";
export const client = new Client();

client.setEndpoint("http://localhost:81/v1").setProject("665ab5f500104dde5b6a");

export const database = new Databases(client);
export const account = new Account(client);

export const DB_ID = "665ab790000e4b711df6";
