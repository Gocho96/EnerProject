import app from "./app";
import "./config/database";

app.listen(app.get("port"), () => {
  console.log("Servidor corriendo en el puerto", app.get("port"));
});