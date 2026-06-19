import express from "express";
import cors from "cors"
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes"
import noteRoutes from "./routes/noteRoutes";
import { errorHandler } from "./middleware/errorHandler";
import { requestLogger } from "./middleware/logger";
import { authenticateUser } from "./middleware/authMiddleware";


connectDB();

const app = express();
app.use(requestLogger)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false}))

app.use("/api/auth", authRoutes)
app.use("/api/notes", authenticateUser, noteRoutes);
app.use(errorHandler);

export default app;