import mongoose from 'mongoose';


const ClasseSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  timestamps: true
});

const Class= mongoose.model('Classe', ClasseSchema);

export default Class;
