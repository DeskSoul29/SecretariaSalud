import app from "./app.js";
import "./config/database.js";

async function main() {
  app.listen(app.get("port"));

  console.log("🍉🍉🍉 http://localhost:", app.get("port"));
  console.log("Environment:", process.env.NODE_ENV);
}

main();
