import Etudiant from '../model/Etudiant.js';
import bcryptjs from 'bcryptjs';
import Classe from '../model/Classe.js';

export const loginEtudiant = async (req, res) => {
  try {
    const { email, mdp } = req.body;

    // Validate required fields
    if (!email || !mdp) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Find the Etudiant by email
    const etudiant = await Etudiant.findOne({ email });
    if (!etudiant) {
      return res.status(404).json({ message: 'Etudiant not found.' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcryptjs.compare(mdp, etudiant.mdp);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // If login is successful, return the Etudiant details (excluding password)
    const { mdp: password, ...etudiantDetails } = etudiant._doc; // Exclude password from response
    res.status(200).json({ message: 'Login successful', etudiant: etudiantDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
// Create a new Etudiant
export const createEtudiant = async (req, res) => {
  try {
    const { nom, email, mdp, classeId } = req.body;

    // Validate required fields
    if (!nom || !email || !mdp || !classeId) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if Classe exists
    const classe = await Classe.findById(classeId);
    if (!classe) {
      return res.status(400).json({ message: 'Classe not found' });
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(mdp, 10);

    const etudiant = new Etudiant({
      nom,
      email,
      mdp: hashedPassword,
      classe: classeId,
    });

    await etudiant.save();
    res.status(201).json({ message: 'Etudiant created successfully', etudiant });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all Etudiants
export const getAllEtudiants = async (req, res) => {
  try {
    const etudiants = await Etudiant.find().populate('classe');
    res.status(200).json(etudiants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
// Login an Etudiant


// Get an Etudiant by ID
export const getEtudiantById = async (req, res) => {
  try {
    const etudiant = await Etudiant.findById(req.params.id).populate('classe');
    if (!etudiant) {
      return res.status(404).json({ message: 'Etudiant not found' });
    }
    res.status(200).json(etudiant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update an Etudiant
export const updateEtudiant = async (req, res) => {
  try {
    const { nom, email, mdp, classeId } = req.body;

    const etudiant = await Etudiant.findById(req.params.id);
    if (!etudiant) {
      return res.status(404).json({ message: 'Etudiant not found' });
    }

    const classe = await Classe.findById(classeId);
    if (!classe) {
      return res.status(400).json({ message: 'Classe not found' });
    }

    etudiant.nom = nom || etudiant.nom;
    etudiant.email = email || etudiant.email;
    etudiant.mdp = mdp || etudiant.mdp;
    etudiant.classe = classeId || etudiant.classe;

    await etudiant.save();
    res.status(200).json(etudiant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete an Etudiant
export const deleteEtudiant = async (req, res) => {
  try {
    const etudiant = await Etudiant.findByIdAndDelete(req.params.id);
    if (!etudiant) {
      return res.status(404).json({ message: 'Etudiant not found' });
    }
    res.status(200).json({ message: 'Etudiant deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

