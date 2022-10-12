import { MongoClient } from "../dep.ts";

const URI = "mongodb://127.0.0.1:27017";

// Mongo Connection Init
const MGClient = new MongoClient();

try {
  await MGClient.connect(URI);
  console.log("Database successfully connected");
} catch (err) {
  console.log(err);
}

export { MGClient };
