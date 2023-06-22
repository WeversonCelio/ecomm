/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
import Categorias from '../model/Categorias.js';

class CategoriaController {
  static listarCategoria = (_req, res) => {
    Categorias.find(
      (err, categorias) => (!err
        ? res.status(200).json(categorias)
        : res.status(500).send({ message: `Falha no Servidor: ${err.message}` })),
    );
  };

  static listarCategoriaPorId = async (req, res) => {
    const { id } = req.params;
    try {
      const categoria = await Categorias.findById(id);
      if (!categoria) {
        return res.status(404).send({ message: 'Categoria nao encontrada' });
      }
      return res.status(200).json(categoria);
    } catch (err) {
      return res.status(500).send({ message: `Falha no Servidor: ${err.message}` });
    }
  };

  static cadastrarCategoria = (req, res) => {
    const categoria = new Categorias(req.body);
    categoria.save((err) => {
      if (!err) {
        return res.status(201).json(categoria);
      } if (err._message === 'categories validation failed') {
        return res.status(400).json({ message: `Falha no Validacao da Categoria. ${err}` });
      }
      return res.status(500).json({ message: `Falha no Servidor: ${err.message}` });
    });
  };
}

export default CategoriaController;
