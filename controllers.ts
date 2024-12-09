import {Request, Response } from "express";
import logger from './logger';
import {addblague, getAllBlague, getIdBlague, getRandomBlague } from './modele';

export const addblagueControler = async (req: Request, res: Response) => {
    try {
        const blague = await addblague(req.body);
            res.status(201).json({
                message :'la blague est crée',
                data: blague,
    });
    } catch(err) {
            logger.error(`la blague n'a pas pu être ajoutée: ${err}`);
            res.status(500).json("Erreur serveur");
    }
   
};

export const getAllBlagueControler = async (req: Request, res: Response) => {
    try {
        const blagueAll = await getAllBlague();
        res.json(blagueAll);
    } catch(err) {
        logger.error(`Erreur lors de la récupération des blagues: ${err}`);
        res.status(500).send("Erreur du serveur");
    }
};

export const getIdBlagueController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const blagueId = await getIdBlague(id);
        res.json(blagueId);
    }catch(err) {
        logger.error(`Erreur lors de la récupération de la blague: ${err}`);
        res.status(500).send("Erreur du serveur");
    }
    
}

export const getRandomBlagueControler = async (req: Request, res: Response) => {
    try{
        const blagueRandom = await getRandomBlague();
        res.json(blagueRandom);
    }catch(err) {
        logger.error(`Il y a une erreur quelques part: ${err}`);
        res.status(500).send('erreur serveur');
    }
}