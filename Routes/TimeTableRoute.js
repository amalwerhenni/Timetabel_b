import express from 'express';

import TimeTable from '../model/TimeTable.js';
import TimeTableController from '../Controller/TimeTableController.js';


const router = express.Router();

// Route pour ajouter un emploi du temps
router.route('/add').post(TimeTableController.saveTimetable);


router.route('/get').get(TimeTableController.getAllTimetables);


// Route pour récupérer un emploi du temps
router.route('/get/:className').get(TimeTableController.getTimetableByClass);

//update
router.route('/update/:className').put(TimeTableController.updateTimetable);


//delete
router.route('/delete/:className').delete(TimeTableController.deleteTimetable);

// Gestion des erreurs non capturées
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erreur serveur.', error: err.message });
});

export default router;
