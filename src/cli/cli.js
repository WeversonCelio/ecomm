/* eslint-disable no-console */
import fs from 'fs';
// eslint-disable-next-line import/extensions
import CategoryService from './CategoryService.js';

const argumentos = process.argv;

function mostrarResultado(response) {
  console.log('response status: ', response.statusCode);
  console.log(response.resultado);
}

async function lerArquivo(caminho) {
  try {
    fs.lstatSync(caminho).isFile();
    const encoding = 'utf-8';
    const arquivo = await fs.promises.readFile(caminho, encoding);
    const arquivoJSON = JSON.parse(arquivo);
    return { statusCode: 200, resultado: arquivoJSON };
  } catch (error) {
    switch (error.code) {
      case 'ENOENT':
        return { statusCode: 400, resultado: (`O arquivo "${error.path}" não foi encontrado`) };
      case 'ERR_INVALID_ARG_TYPE':
        return { statusCode: 400, resultado: ('Nenhum arquivo foi informado. Informe corretamente todos os parametros ') };

      default:
        return {
          statusCode: 400, resultado: ('O arquivo informado não é um JSON valido'),
        };
    }
  }
}

async function processarComando(args) {
  const comando = args[3];
  const parametro1 = args[4];
  const parametro2 = args[5];
  switch (comando) {
    case '--listarCategorias':
      try {
        const listaDeCategorias = await CategoryService.findCategories();
        mostrarResultado(listaDeCategorias);
      } catch (error) {
        console.error(`ocorreu um erro em ${comando}`);
      }
      break;

    case '--recuperarCategoriaPorId':
      try {
        const categoriaLocalida = await CategoryService.findCategoryById(parametro1);
        mostrarResultado(categoriaLocalida);
      } catch (error) {
        console.error(`ocorreu um erro em ${comando}`);
      }
      break;

    case '--inserirCategoria':
      try {
        const leituraNovaCategoria = await lerArquivo(parametro1);
        if (leituraNovaCategoria.statusCode === 400) {
          mostrarResultado(leituraNovaCategoria);
          break;
        }
        const categoriaInserida = await CategoryService
          .createCategory(leituraNovaCategoria.resultado);
        mostrarResultado(categoriaInserida);
      } catch (error) {
        console.error(`ocorreu um erro em ${comando}`);
      }
      break;

    case '--atualizarCategoria':
      try {
        const idCategoriaAtualiza = parametro1;
        const leituraCategoriaAtualizada = await lerArquivo(parametro2);
        if (leituraCategoriaAtualizada.statusCode === 400) {
          mostrarResultado(leituraCategoriaAtualizada);
          break;
        }
        const categoriaAtualidada = await CategoryService
          .updateCategory(idCategoriaAtualiza, leituraCategoriaAtualizada.resultado);
        mostrarResultado(categoriaAtualidada);
      } catch (error) {
        console.error(`ocorreu um erro em ${comando}`);
      }
      break;

    case '--excluirCategoria':
      try {
        const categoriaExluida = await CategoryService.deleteCategory(parametro1);
        mostrarResultado(categoriaExluida);
      } catch (error) {
        console.error(`ocorreu um erro em ${comando}`);
      }
      break;
    default:
      console.log('comando invalido');
      break;
  }
}

processarComando(argumentos);
