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
exports.getRandomBlagueControler = exports.getIdBlagueController = exports.getAllBlagueControler = exports.addblagueControler = void 0;
const logger_1 = __importDefault(require("./logger"));
const modele_1 = require("./modele");
const addblagueControler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blague = yield (0, modele_1.addblague)(req.body);
        res.status(201).json({
            message: 'la blague est crée',
            data: blague,
        });
    }
    catch (err) {
        logger_1.default.error(`la blague n'a pas pu être ajoutée: ${err}`);
        res.status(500).json("Erreur serveur");
    }
});
exports.addblagueControler = addblagueControler;
const getAllBlagueControler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blagueAll = yield (0, modele_1.getAllBlague)();
        res.json(blagueAll);
    }
    catch (err) {
        logger_1.default.error(`Erreur lors de la récupération des blagues: ${err}`);
        res.status(500).send("Erreur du serveur");
    }
});
exports.getAllBlagueControler = getAllBlagueControler;
const getIdBlagueController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const blagueId = yield (0, modele_1.getIdBlague)(id);
        res.json(blagueId);
    }
    catch (err) {
        logger_1.default.error(`Erreur lors de la récupération de la blague: ${err}`);
        res.status(500).send("Erreur du serveur");
    }
});
exports.getIdBlagueController = getIdBlagueController;
const getRandomBlagueControler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blagueRandom = yield (0, modele_1.getRandomBlague)();
        res.json(blagueRandom);
    }
    catch (err) {
        logger_1.default.error(`Il y a une erreur quelques part: ${err}`);
        res.status(500).send('erreur serveur');
    }
});
exports.getRandomBlagueControler = getRandomBlagueControler;
