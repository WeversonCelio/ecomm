/* eslint-disable import/extensions */
import express from 'express';
import ProdutoController from '../controller/produtosController.js';

const router = express.Router();

const URN_PUBLICA = '/api/products';
const URN_ADMIN = '/api/admin/products';

router
  .get(URN_PUBLICA, ProdutoController.listarProduto)
  .get(`${URN_PUBLICA}/:id`, ProdutoController.listarProdutoPorId)
  .post(URN_ADMIN, ProdutoController.cadastrarProduto)
  .put(`${URN_ADMIN}/:id`, ProdutoController.atualizarProduto)
  .delete(`${URN_ADMIN}/:id`, ProdutoController.excluirProduto);

export default router;
