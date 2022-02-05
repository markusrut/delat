import "dotenv/config";
import express from "express";
import cors from "cors";
import { addRoutes } from "./routes/_routes";
import authMiddleware from "./middlewares/authMiddleware";

try {
  var server = express();

  server.use(cors());
  // server.use(authMiddleware().unless({ path: ["/health", "/token"] }));
  server.use("/", addRoutes());

  const port = process.env.APP_PORT || 5000;
  server.listen(port, () => {
    console.log(`Server started on port: ${port}`);
    console.log(`http://localhost:${port}`);
    console.log(`Press Ctrl+C to quit`);
  });
} catch (e) {
  console.log(e);
}
