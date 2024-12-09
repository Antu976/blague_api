import { Router} from  "express" ; 
import {addblagueControler, getAllBlagueControler, getIdBlagueController, getRandomBlagueControler } from './controllers';

const router = Router();

router.post('/add', addblagueControler);
router.get('/', getAllBlagueControler);
router.get('/:id', getIdBlagueController);
router.get('/random', getRandomBlagueControler);

export default router;

