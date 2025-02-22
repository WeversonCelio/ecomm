/* eslint-disable import/no-extraneous-dependencies */
import mongoose from 'mongoose';

const categoriaSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  nome: {
    type: String,
    required: true,
    match: /^[A-z0-9- à-úÀ-Ú]{3,}/,
  },
  status: {
    type: String,
    enum: ['ATIVA', 'INATIVA'],
    required: true,
  },
});
const categorias = mongoose.model('categories', categoriaSchema);

export default categorias;
