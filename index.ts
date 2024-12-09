import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";
import logger from './logger';
import sequelize from "./bdd/database";
import blagues from './bdd/blague';

sequelize.sync({force:false}).then(() => logger.info('la base de données est prête'));

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

app.post('/add', async (req: Request, res: Response) => {
    try {
        await blagues.create(req.body).then(() => {
            res.status(201).send('la blague est crée');
        })
    } catch(err) {
            logger.error(`la blague n'a pas pu être ajoutée: ${err}`);
            res.status(500).send("Erreur serveur");
    }
   
})

app.get('/blagues', async (req: Request, res: Response) => {
    try {
        const recup = await blagues.findAll();
        res.send(recup);
    } catch(err) {
        logger.error(`Erreur lors de la récupération des blagues: ${err}`);
        res.status(500).send("Erreur du serveur");
    }
    
});

app.get('/blagues/:id', async (req: Request, res: Response) => {
    try {
        const recupId = req.params.id;
        const blague = await blagues.findOne({where :{ id: recupId}})
        res.send(blague);
    } catch(err) {
        logger.error(`Erreur lors de la récupération des blagues: ${err}`);
        res.status(500).send("Erreur du serveur");
    }
    
});

app.get('/blagues/random', async (req: Request, res: Response) => {
    try {
        // const randomBlague = await blagues.findOne({
        //     order: sequelize.literal('RANDOM()'),
        //     limit:1
        const [results] = await sequelize.query(
            'SELECT * FROM blagues ORDER BY RANDOM() LIMIT 1');

            res.json(results[0]);
            
        // res.json(randomBlague);
    } catch(err) {
        logger.error(`Erreur lors de la récupération des blagues: ${err}`);
        res.status(500).send("Erreur du serveur");
    }
    
});




// Route principale
app.get("/", (req: Request, res: Response) => {
    logger.info("Route principale");
    res.send("Bienvenue dans notre API !");
});


app.listen(port, () => {
    logger.info(`Notre serveur tourne sur http://localhost:${port}`);
});