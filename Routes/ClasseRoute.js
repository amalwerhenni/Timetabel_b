import express from 'express';
import ClasseController from '../Controller/ClasseController.js';

const router = express.Router();

// Routes pour les classes
router.route('/create').post(ClasseController.createClasse);

//get all
router.route('/all').get(ClasseController.getAllClasses);
router.route('/:id').get(ClasseController.getClasseById);
router.route('/:id').put(ClasseController.updateClasse);
router.route('/:id').delete(ClasseController.deleteClasse);

export default router;
