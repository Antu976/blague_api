// import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";
import logger from './logger';
import sequelize from "./bdd/database";
import blagues from './bdd/blague';

sequelize.sync({force:false}).then(() => logger.info('la base de données est prête'));

dotenv.config();


export const addblague = async (data: {contenu: string; reponse:string}) => {
    const newBlague = await blagues.create(data)
    return newBlague;
};

export const getAllBlague = async () => {
    const recup = await blagues.findAll();
    return recup;
};

export const getIdBlague = async (id: number) => {
        const blague = await blagues.findOne({where :{ id: id}})
        return blague;
};


export const getRandomBlague = async () => {
    const randomBlague = await blagues.findOne({
        order: sequelize.fn('RANDOM'),
    });
    return randomBlague;
}