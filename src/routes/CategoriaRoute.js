/* eslint-disable import/extensions */
import express from 'express';
import CategoriaController from '../controller/categoriasController.js';

const router = express.Router();

const URN_PUBLICA = '/api/categories';
const URN_ADMIN = '/api/admin/categories';

router
  .get(URN_PUBLICA, CategoriaController.listarCategoria)
  .get(`${URN_PUBLICA}/:id`, CategoriaController.listarCategoriaPorId)
  .post(URN_ADMIN, CategoriaController.cadastrarCategoria);

export default router;
