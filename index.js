import dotenv from 'dotenv';
import mongoose  from 'mongoose';
import express  from 'express';
import cors  from 'cors';
import ClasseRoute  from './Routes/ClasseRoute.js';
import TimeTableRoute  from './Routes/TimeTableRoute.js';
import etudiantRoutes  from './Routes/etudiantRoutes.js';

dotenv.config();
const app = express();

// Middleware CORS
app.use(
  cors({
    origin: "http://localhost:3000", // Supprimé le `/` final
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Si vous utilisez des cookies ou sessions
  })
);

app.use(express.json());

// Routes
app.use('/classes', ClasseRoute);
app.use('/timetable', TimeTableRoute);

app.use('/etudiants', etudiantRoutes);

// Connexion MongoDB
mongoose.connect(process.env.MONGODB_URL, {
})
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Lancement du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
