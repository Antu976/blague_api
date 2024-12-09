"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("./database"));
const blagues = database_1.default.define('blague', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    contenu: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    reponse: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    }
});
exports.default = blagues;
