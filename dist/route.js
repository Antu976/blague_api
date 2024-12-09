"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("./controllers");
const router = (0, express_1.Router)();
router.post('/add', controllers_1.addblagueControler);
router.get('/', controllers_1.getAllBlagueControler);
router.get('/:id', controllers_1.getIdBlagueController);
router.get('/random', controllers_1.getRandomBlagueControler);
exports.default = router;
