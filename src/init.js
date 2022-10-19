import "dotenv/config";
import "./db";
import "./models/User";
import "./models/Notice";
import "./models/Installer";
import "./models/Paint";
import "./models/Comment";
import "./models/Rank";
import app from "./server";

const PORT = 5555;

const handleListen = () => {
  console.log(`http://localhost:${PORT} 🚀`);
};

app.listen(PORT, handleListen);
