import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";
import logger from './logger';
import sequelize from "./bdd/database";
import route from './route';

sequelize.sync({force:false}).then(() => logger.info('la base de données est prête'));

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

app.use('/blagues', route)

// Route principale
app.get("/", (req: Request, res: Response) => {
    logger.info("Route principale");
    res.send("Bienvenue dans notre API !");
});


app.listen(port, () => {
    logger.info(`Notre serveur tourne sur http://localhost:${port}`);
});