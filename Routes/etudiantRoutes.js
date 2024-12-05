// routes/etudiantRoutes.js
import express from 'express';
import {createEtudiant, deleteEtudiant ,updateEtudiant,getAllEtudiants, getEtudiantById,loginEtudiant} from '../Controller/etudiantController.js';
const router = express.Router();

// Create a new Etudiant
router.route("/create").post(createEtudiant);

router.route('/login').post(loginEtudiant);


// Get all Etudiants
router.route('/all').get(getAllEtudiants);

// Get Etudiant by ID
router.route('/:id').get(getEtudiantById);

// Update Etudiant by ID
router.route('/:id').put(updateEtudiant);

// Delete Etudiant by ID
router.route('/:id').delete(deleteEtudiant);

export default router;