import { server } from "./app/app.js";
import { config } from "./config/env/envConfig.js";
import { connectToMongo } from "./config/database/dbConfig.js";


const PORT = config.portApi;


const startServer = async () => {
  try {
    await connectToMongo();

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1);
  }
};

startServer();
