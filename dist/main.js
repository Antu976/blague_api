"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = __importDefault(require("./logger"));
const database_1 = __importDefault(require("./bdd/database"));
const route_1 = __importDefault(require("./route"));
database_1.default.sync({ force: false }).then(() => logger_1.default.info('la base de données est prête'));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
app.use('/blagues', route_1.default);
// Route principale
app.get("/", (req, res) => {
    logger_1.default.info("Route principale");
    res.send("Bienvenue dans notre API !");
});
app.listen(port, () => {
    logger_1.default.info(`Notre serveur tourne sur http://localhost:${port}`);
});
