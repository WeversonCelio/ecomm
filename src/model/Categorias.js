/* eslint-disable import/no-extraneous-dependencies */
import mongoose from 'mongoose';

const categoriaSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  nome: {
    type: String,
    required: true,
    match: /^[A-z][A-z)-9]{2,}/,
  },
  status: {
    type: String,
    enum: ['ATIVA', 'INATIVA'],
    required: true,
  },
});
const categorias = mongoose.model('categories', categoriaSchema);

export default categorias;
