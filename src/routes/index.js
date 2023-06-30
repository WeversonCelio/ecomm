/* eslint-disable import/extensions */
import express from 'express';
import categorias from './CategoriaRoute.js';
import produtos from './ProdutoRoute.js';

const routes = (app) => {
  app.route('/').get((req, res) => {
    res.status(200).send('Bem vindo ao ECOMM');
  });
  app.use(
    express.json(),
    categorias,
    produtos,
  );
};

export default routes;
