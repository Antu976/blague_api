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
exports.getRandomBlague = exports.getIdBlague = exports.getAllBlague = exports.addblague = void 0;
// import express, {Express, Request, Response} from "express";
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = __importDefault(require("./logger"));
const database_1 = __importDefault(require("./bdd/database"));
const blague_1 = __importDefault(require("./bdd/blague"));
database_1.default.sync({ force: false }).then(() => logger_1.default.info('la base de données est prête'));
dotenv_1.default.config();
const addblague = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const newBlague = yield blague_1.default.create(data);
    return newBlague;
});
exports.addblague = addblague;
const getAllBlague = () => __awaiter(void 0, void 0, void 0, function* () {
    const recup = yield blague_1.default.findAll();
    return recup;
});
exports.getAllBlague = getAllBlague;
const getIdBlague = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const blague = yield blague_1.default.findOne({ where: { id: id } });
    return blague;
});
exports.getIdBlague = getIdBlague;
const getRandomBlague = () => __awaiter(void 0, void 0, void 0, function* () {
    const randomBlague = yield blague_1.default.findOne({
        order: database_1.default.fn('RANDOM'),
    });
    return randomBlague;
});
exports.getRandomBlague = getRandomBlague;
