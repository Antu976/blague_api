"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = __importDefault(require("./logger"));
const database_1 = __importDefault(require("./bdd/database"));
const blague_1 = __importDefault(require("./bdd/blague"));
database_1.default.sync({ force: false }).then(() => logger_1.default.info('la base de données est prête'));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
app.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield blague_1.default.create(req.body).then(() => {
            res.status(201).send('la blague est crée');
        });
    }
    catch (err) {
        logger_1.default.error(`la blague n'a pas pu être ajoutée: ${err}`);
        res.status(500).send("Erreur serveur");
    }
}));
app.get('/blagues', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recup = yield blague_1.default.findAll();
        res.send(recup);
    }
    catch (err) {
        logger_1.default.error(`Erreur lors de la récupération des blagues: ${err}`);
        res.status(500).send("Erreur du serveur");
    }
}));
app.get('/blagues/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recupId = req.params.id;
        const blague = yield blague_1.default.findOne({ where: { id: recupId } });
        res.send(blague);
    }
    catch (err) {
        logger_1.default.error(`Erreur lors de la récupération des blagues: ${err}`);
        res.status(500).send("Erreur du serveur");
    }
}));
app.get('/blagues/random', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const randomBlague = await blagues.findOne({
        //     order: sequelize.literal('RANDOM()'),
        //     limit:1
        const [results] = yield database_1.default.query('SELECT * FROM blagues ORDER BY RANDOM() LIMIT 1');
        res.json(results[0]);
        // res.json(randomBlague);
    }
    catch (err) {
        logger_1.default.error(`Erreur lors de la récupération des blagues: ${err}`);
        res.status(500).send("Erreur du serveur");
    }
}));
// Route principale
app.get("/", (req, res) => {
    logger_1.default.info("Route principale");
    res.send("Bienvenue dans notre API !");
});
app.listen(port, () => {
    logger_1.default.info(`Notre serveur tourne sur http://localhost:${port}`);
});
