import { createServer } from "./config/express";
import { AddressInfo } from "net";
import http from "http";

const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 3003;

const startServer = async () => {
  const app = createServer();
  const server = http.createServer(app).listen({ port, host }, () => {
    const addressInfo = server.address() as AddressInfo;
    console.log(
      `Server ready at http:${addressInfo.address}:${addressInfo.port}`
    );
  });

  const signalTraps: NodeJS.Signals[] = ["SIGTERM", "SIGINT", "SIGUSR2"];

  signalTraps.forEach((type) => {
    process.once(type, async () => {
      console.log(`signal end on ${type}`);

      server.close(() => {
        console.log("Server was gracefully shut down");
      });
    });
  });
};

startServer();
