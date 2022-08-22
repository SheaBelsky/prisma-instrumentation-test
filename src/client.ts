import { PrismaClient } from ".prisma/client";
import setupTelemetry from "./telemetry";

setupTelemetry();

const prisma = new PrismaClient();

export default prisma;
