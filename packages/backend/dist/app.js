"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config/config"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const projectRoutes_1 = __importDefault(require("./routes/projectRoutes"));
const phaseRoutes_1 = __importDefault(require("./routes/phaseRoutes"));
const purchaseRoutes_1 = __importDefault(require("./routes/phases/purchaseRoutes"));
const documentRoutes_1 = __importDefault(require("./routes/phases/documentRoutes"));
const engineeringRoutes_1 = __importDefault(require("./routes/phases/engineeringRoutes"));
const installationRoutes_1 = __importDefault(require("./routes/phases/installationRoutes"));
const maintenanceRoutes_1 = __importDefault(require("./routes/phases/maintenanceRoutes"));
const marketingRoutes_1 = __importDefault(require("./routes/phases/marketingRoutes"));
const networkOperatorRoutes_1 = __importDefault(require("./routes/phases/networkOperatorRoutes"));
const projectDetailsRoutes_1 = __importDefault(require("./routes/projectDetailsRoutes"));
const retieRoutes_1 = __importDefault(require("./routes/phases/retieRoutes"));
const salesRoutes_1 = __importDefault(require("./routes/phases/salesRoutes"));
const taxIncentiveRoutes_1 = __importDefault(require("./routes/phases/taxIncentiveRoutes"));
const app = (0, express_1.default)();
// ----- SETTINGS -----
app.set("port", config_1.default.PORT);
// ----- MIDDLEWARES -----
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
// ----- ROUTES -----
app.use("/api", userRoutes_1.default);
app.use("/api", projectRoutes_1.default);
app.use("/api", phaseRoutes_1.default);
app.use("/api", projectDetailsRoutes_1.default);
app.use("/api", documentRoutes_1.default);
app.use("/api", purchaseRoutes_1.default);
app.use("/api", engineeringRoutes_1.default);
app.use("/api", installationRoutes_1.default);
app.use("/api", maintenanceRoutes_1.default);
app.use("/api", marketingRoutes_1.default);
app.use("/api", networkOperatorRoutes_1.default);
app.use("/api", retieRoutes_1.default);
app.use("/api", salesRoutes_1.default);
app.use("/api", taxIncentiveRoutes_1.default);
exports.default = app;
