import TimeTable from '../model/TimeTable.js';

// Ajouter un emploi du temps
const saveTimetable = async (req, res) => {
    try {
      const { className, days, times, subjects } = req.body;
  
      // Validation des champs
      if (!className || !days || !times || !subjects) {
        return res.status(400).json({ message: 'Tous les champs sont requis.' });
      }
  
      // Vérifier si un emploi du temps existe déjà pour la classe
      const existingTimetable = await TimeTable.findOne({ className });
      if (existingTimetable) {
        return res.status(400).json({ message: 'Un emploi du temps existe déjà pour cette classe.' });
      }
  
      // Enregistrer le nouvel emploi du temps
      const timetable = new TimeTable({ className, days, times, subjects });
      await timetable.save();
  
      // Send the class name along with the success message
      res.status(201).json({ 
        message: 'Emploi du temps enregistré avec succès.', 
        timetable, 
        className: className // Include the class name in the response
      });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de l\'enregistrement.', error: error.message });
    }
  };
  
// Récupérer l'emploi du temps d'une classe
const getTimetableByClass = async (req, res) => {
  try {
    const { className } = req.params;

    // Rechercher l'emploi du temps par classe
    const timetable = await TimeTable.findOne({ className });
    if (!timetable) {
      return res.status(404).json({ message: 'Emploi du temps introuvable.' });
    }

    res.status(200).json(timetable);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération.', error: error.message });
  }
};

// Récupérer tous les emplois du temps
const getAllTimetables = async (req, res) => {
  try {
    // Rechercher tous les emplois du temps
    const timetables = await TimeTable.find();
    
    if (timetables.length === 0) {
      return res.status(404).json({ message: 'Aucun emploi du temps trouvé.' });
    }

    res.status(200).json(timetables);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des emplois du temps.', error: error.message });
  }
};


// Supprimer un emploi du temps
const deleteTimetable = async (req, res) => {
  try {
    const { className } = req.params;

    // Supprimer l'emploi du temps par classe
    const deletedTimetable = await TimeTable.findOneAndDelete({ className });
    if (!deletedTimetable) {
      return res.status(404).json({ message: 'Emploi du temps introuvable.' });
    }

    res.status(200).json({ message: 'Emploi du temps supprimé avec succès.', deletedTimetable });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression.', error: error.message });
  }
};

// Mettre à jour un emploi du temps
const updateTimetable = async (req, res) => {
  try {
    const { className } = req.params;
    const { days, times, subjects } = req.body;

    // Validation des champs
    if (!days || !times || !subjects) {
      return res.status(400).json({ message: 'Tous les champs sont requis pour la mise à jour.' });
    }

    // Rechercher et mettre à jour l'emploi du temps
    const updatedTimetable = await TimeTable.findOneAndUpdate(
      { className },
      { days, times, subjects },
      { new: true }
    );

    if (!updatedTimetable) {
      return res.status(404).json({ message: 'Emploi du temps introuvable.' });
    }

    res.status(200).json({ message: 'Emploi du temps mis à jour avec succès.', updatedTimetable });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour.', error: error.message });
  }
};
export default {saveTimetable,getTimetableByClass,getAllTimetables,deleteTimetable,updateTimetable}
