"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
require("dotenv/config");
const { PORT_SERVER } = process.env;
app_1.app.listen(PORT_SERVER, () => console.log(`Escutando na porta ${PORT_SERVER}`));
//# sourceMappingURL=server.js.map