/* eslint-disable import/no-extraneous-dependencies */
import mongoose from 'mongoose';

const produtoSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  nome: {
    type: String,
    required: true,
    match: /^[A-z0-9- à-úÀ-Ú]{3,}/,
  },
  slug: {
    type: String,
    match: /^[A-z0-9-]{3,}/,
    required: true,
  },
  precoUnitario: {
    type: mongoose.Types.Decimal128,
    min: 0.01,
    required: true,
  },
  quantidadeEstoque: {
    type: Number,
    min: 1,
    max: 10000,
    required: true,
  },
  categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'categories',
    required: true,
  },
});
const categorias = mongoose.model('products', produtoSchema);

export default categorias;
