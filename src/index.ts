import { createUser, getAllUsers } from "./routes/users";
import express from "express";
import http from "http";

async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);
  app.use(
    express.json({
      type: ["application/json", "text/plain"]
    })
  );
  // Necessary for Google to send POST bodies to the gauth endpoint
  app.use(express.urlencoded({ extended: true }));

  app.get("/users", getAllUsers)

  app.post("/createUser", createUser);

  // Start the HTTP server
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: process.env.PORT }, resolve)
  );

  // eslint-disable-next-line no-console
  console.log(
    `🚀 Server ready at http://localhost:${process.env.PORT}`
  );
}

void startServer();