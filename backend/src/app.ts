import express from "express";
import config from "./config/config";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes"
import projectRoutes from "./routes/projectRoutes"
import phaseRoutes from "./routes/phaseRoutes";
import purchaseRoutes from "./routes/phases/purchaseRoutes";
import documentRoutes from "./routes/phases/documentRoutes";
import engineeringRoutes from "./routes/phases/engineeringRoutes";
import installationRoutes from "./routes/phases/installationRoutes";
import maintenanceRoutes from "./routes/phases/maintenanceRoutes";
import marketingRoutes from "./routes/phases/marketingRoutes";
import networkOperatorRoutes from "./routes/phases/networkOperatorRoutes";
import projectDetailsRoutes from "./routes/projectDetailsRoutes";
import retieRoutes from "./routes/phases/retieRoutes";
import shoppingRoutes from "./routes/phases/salesRoutes";
import taxIncentiveRoutes from "./routes/phases/taxIncentiveRoutes";

const app = express();

// ----- SETTINGS -----
app.set("port", config.PORT);

// ----- MIDDLEWARES -----
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser());

// ----- ROUTES -----
app.use("/api", userRoutes);
app.use("/api", projectRoutes);
app.use("/api", phaseRoutes);

app.use("/api", projectDetailsRoutes);

app.use("/api", documentRoutes);
app.use("/api", purchaseRoutes);

app.use("/api", engineeringRoutes);
app.use("/api", installationRoutes);
app.use("/api", maintenanceRoutes);
app.use("/api", marketingRoutes);
app.use("/api", networkOperatorRoutes);
app.use("/api", retieRoutes);
app.use("/api", shoppingRoutes);
app.use("/api", taxIncentiveRoutes);


export default app;
