/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
import Categorias from '../model/Categorias.js';

class CategoriaController {
  static listarCategoria = async (_req, res) => {
    try {
      const categorias = await Categorias.find();
      if (!categorias) {
        return res.status(404).send({ message: 'Produtos nao encontrado' });
      }
      return res.status(200).json(categorias);
    } catch (err) {
      return res.status(500).send({ message: `Falha no Servidor: ${err.message}` });
    }
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

  static cadastrarCategoria = async (req, res) => {
    const resposta = {
      ...req.body,
      status: 'ATIVA',
    };
    const categoria = new Categorias(resposta);
    try {
      const categoriaSalva = await categoria.save();
      return res.status(201).json(categoriaSalva);
    } catch (error) {
      if (error._message === 'categories validation failed') {
        return res.status(400).json({ message: 'Falha no Validacao da Categoria' });
      }
      return res.status(500).json({ message: `Falha no Servidor: ${error.message}` });
    }
  };

  static atualizarCategoria = async (req, res) => {
    const { id } = req.params;
    const categoria = req.body;
    try {
      const categoriaRetorno = await Categorias.findByIdAndUpdate(id, { $set: categoria });
      if (!categoriaRetorno) {
        return res.status(404).send({ message: 'Categoria nao encontrada' });
      }
      return res.status(200).json({ message: ' Categoria atualizada' });
    } catch (err) {
      return res.status(500).send({ message: `Falha no Servidor: ${err.message}` });
    }
  };

  static ativarCategoria = async (req, res) => {
    const { id } = req.params;
    const ativar = { status: 'ATIVA' };
    try {
      const categoriaRetorno = await Categorias.findByIdAndUpdate(id, { $set: ativar });
      if (!categoriaRetorno) {
        return res.status(404).send({ message: 'Categoria nao encontrada' });
      }
      return res.status(200).json({ message: 'Categoria ativada' });
    } catch (err) {
      return res.status(500).send({ message: `Falha no Servidor: ${err.message}` });
    }
  };

  static excluirCategoria = async (req, res) => {
    const { id } = req.params;
    try {
      const categoria = await Categorias.findByIdAndDelete(id);
      if (!categoria) {
        return res.status(404).send({ message: 'Categoria nao encontrada' });
      }
      return res.status(200).json({ message: 'Categoria removida' });
    } catch (err) {
      return res.status(500).send({ message: `Falha no Servidor: ${err.message}` });
    }
  };
}

export default CategoriaController;
