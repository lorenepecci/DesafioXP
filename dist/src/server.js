"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("fs");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const app_1 = require("./app");
const swagger_json_1 = __importDefault(require("./swagger.json"));
app_1.app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
const { PORT } = process.env;
app_1.app.listen(PORT, () => console.log(`Escutando na porta ${PORT}`));
//# sourceMappingURL=server.js.map