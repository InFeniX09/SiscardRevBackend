import Server from "./models/server";
import dotenv from "dotenv";
dotenv.config();

const app = async () => {
  try {
    const server = new Server();
    await server.dbConnect();
    server.execute();
  } catch (error) {
    console.log(error);
    throw new Error(error as string);
  }
};

app();