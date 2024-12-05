// models/Etudiant.js
import mongoose, {Schema} from 'mongoose';



const etudiantSchema = new Schema({
  nom: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'is invalid'],
  },
  mdp: {
    type: String,
    required: true,
  },
  classe: {
    type: Schema.Types.ObjectId,
    ref: 'Classe',
    required: true,
  },
}, { timestamps: true });

const Etudiant = mongoose.model('Etudiant', etudiantSchema);


export default Etudiant;
