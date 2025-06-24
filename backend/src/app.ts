import express from "express";
import config from "./config/config";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes"
import projectRoutes from "./routes/projectRoutes"
import phaseRoutes from "./routes/phaseRoutes";
import billingRoutes from "./routes/billingRoutes";
import documentalRoutes from "./routes/documentalRoutes";
import engineeringRoutes from "./routes/engineeringRoutes";
import installationRoutes from "./routes/installationRoutes";
import maintenanceRoutes from "./routes/maintenanceRoutes";
import marketingRoutes from "./routes/marketingRoutes";

const app = express();

//port config
app.set("port", config.PORT);

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser());

//routes
app.use("/api", userRoutes);
app.use("/api", projectRoutes);
app.use("/api", phaseRoutes);

app.use("/api", billingRoutes);
app.use("/api", documentalRoutes);
app.use("/api", engineeringRoutes);
app.use("/api", installationRoutes);
app.use("/api", maintenanceRoutes);
app.use("/api", marketingRoutes);


export default app;
