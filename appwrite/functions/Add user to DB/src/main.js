import { Client, Databases, ID } from 'node-appwrite';

// This is your Appwrite function
// It's executed each time we get a request
export default async (context) => {
 const client = new Client();
  client
  .setEndpoint("https://appwrite.oswinjerome.in/v1") // Your API Endpoint
  .setProject("665b4d2f001f172200d1") // Your project ID
  .setKey("dddb67f504f96e93b68ab44cdd8e431ba610365d0a33a2f20105b39e1c0f1225a14e9627224ad12804567d3431ea2b6b2bb4f7fe4b1e987715116b4131bccd3123fd6d6ce5c8618810616abe693220205ce8b74b5bd33184a81695821a968e104636b3c65dfd26a95df5726e910e7c450ec065c7f297c3487d6472c0b54b0390") // Your secret API key


  const db = new Databases(client)

  const data = JSON.parse(context.req.bodyRaw)
 try{
   await db.createDocument("dev","users",data.$id,{
   name:data.name,
   id:data.$id,
  })
  
 }catch(e){
   context.log(e.message)
 }
//   context.log(data)
  
   return context.res.send("This is a response!");

};
