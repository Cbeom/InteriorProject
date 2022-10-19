import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;

const handleDbError = (error) => {
  console.log(`❌ DB Error ${error}`);
};

const handleDbOpen = () => {
  console.log(`✅ DB Connection`);
};

db.on("error", handleDbError);
db.once("open", handleDbOpen);
