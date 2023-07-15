require("dotenv/config");
// import "dotenv/config";
import { connect } from "mongoose";

async function dbConnect(): Promise<void> {
  try {
    const DB_URI = <string>process.env.DB_URI;
    await connect(DB_URI);
  } catch (error) {
    return console.log(error)
  }

}

export default dbConnect;