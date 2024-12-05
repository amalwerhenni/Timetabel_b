import mongoose from 'mongoose';

const timetableSchema = new mongoose.Schema({
  className: { type: String, required: true }, // Utilisation de String au lieu de ObjectId
  days: { type: [String], required: true }, // Tableau de jours
  times: { type: [String], required: true }, // Tableau d'horaires
  subjects: { type: [[String]], required: true }, // Tableau 2D pour les matières
}, {
  timestamps: true,
});

const Times = mongoose.model('Timetable', timetableSchema);
export default Times;
