/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
import Produtos from '../model/Produtos.js';

class ProdutoController {
  static listarProduto = async (_req, res) => {
    try {
      const produtos = await Produtos.find()
        .populate({
          path: 'categoria',
          select: 'nome',
          strictPopulate: false,
        }).exec();

      if (!produtos) {
        return res.status(404).send({ message: 'Produtos nao encontrado' });
      }
      return res.status(200).json(produtos);
    } catch (err) {
      return res.status(500).send({ message: `Falha no Servidor: ${err.message}` });
    }
  };

  static listarProdutoPorId = async (req, res) => {
    const { id } = req.params;
    try {
      const produto = await Produtos.findById(id)
        .populate({
          path: 'categoria',
          select: 'nome',
          strictPopulate: false,
        }).exec();

      if (!produto) {
        return res.status(404).send({ message: 'Produto nao encontrado' });
      }
      return res.status(200).json(produto);
    } catch (err) {
      return res.status(500).send({ message: `Falha no Servidor: ${err.message}` });
    }
  };

  static cadastrarProduto = async (req, res) => {
    const produto = new Produtos(req.body);

    try {
      const produtoSalvo = await produto.save();
      return res.status(201).json(produtoSalvo);
    } catch (error) {
      if (error._message === 'products validation failed') {
        return res.status(400).json({ message: `Falha no Validacao do Produto - ${error}` });
      }
      return res.status(500).json({ message: `Falha no Servidor: ${error.message}` });
    }
  };

  static atualizarProduto = async (req, res) => {
    const { id } = req.params;
    const produto = req.body;
    try {
      const produtoRetorno = await Produtos.findByIdAndUpdate(id, { $set: produto });
      if (!produtoRetorno) {
        return res.status(404).send({ message: 'Produto nao encontrado' });
      }
      return res.status(200).json({ message: ' Produto atualizada' });
    } catch (err) {
      return res.status(500).send({ message: `Falha no Servidor: ${err.message}` });
    }
  };

  static excluirProduto = async (req, res) => {
    const { id } = req.params;
    try {
      const produto = await Produtos.findByIdAndDelete(id);
      if (!produto) {
        return res.status(404).send({ message: 'Produto nao encontrado' });
      }
      return res.status(200).json({ message: 'Produto removida' });
    } catch (err) {
      return res.status(500).send({ message: `Falha no Servidor: ${err.message}` });
    }
  };
}

export default ProdutoController;
