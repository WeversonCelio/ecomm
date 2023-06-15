import fs from 'fs';
import CategoryService from "./CategoryService.js";

const argumentos = process.argv;

function mostrarResultado(response) {
    console.log("response status: ", response.statusCode);
    console.log(response.resultado);
}

async function lerArquivo(caminho) {
    try {
        fs.lstatSync(caminho).isFile();
        const encoding = 'utf-8';
        const arquivo = await fs.promises.readFile(caminho, encoding);
        const arquivoJSON = JSON.parse(arquivo)
        return { statusCode: 200, resultado: arquivoJSON };
    } catch (error) {
        if (error.code === "ENOENT") {
            return { statusCode: 400, resultado: (`O arquivo "${error.path}" não foi encontrado`) };
        } else if (error.code === "ERR_INVALID_ARG_TYPE") {
            return { statusCode: 400, resultado: (`Nenhum arquivo foi informado. Informe corretamente todos os parametros `) };
        }
        return { statusCode: 400, resultado: (`O arquivo informado não é um JSON valido`) };
    }

}


async function processarComando(argumentos) {
    const comando = argumentos[3];
    const parametro1 = argumentos[4];
    const parametro2 = argumentos[5];
    switch (comando) {
        case '--listarCategorias':
            const listaDeCategorias = await CategoryService.findCategories();
            mostrarResultado(listaDeCategorias)
            break;

        case '--recuperarCategoriaPorId':
            const categoriaLocalida = await CategoryService.findCategoryById(parametro1);
            mostrarResultado(categoriaLocalida)
            break;

        case '--inserirCategoria':
            const leituraNovaCategoria = await lerArquivo(parametro1);
            if (leituraNovaCategoria.statusCode === 400) {
                mostrarResultado(leituraNovaCategoria);
                break;
            }
            const categoriaInserida = await CategoryService.createCategory(leituraNovaCategoria.resultado);
            mostrarResultado(categoriaInserida);
            break;

        case '--atualizarCategoria':
            const idCategoriaAtualiza = parametro1;
            const leituraCategoriaAtualizada = await lerArquivo(parametro2);
            if (leituraCategoriaAtualizada.statusCode === 400) {
                mostrarResultado(leituraCategoriaAtualizada);
                break
            }
            const categoriaAtualidada = await CategoryService.updateCategory(idCategoriaAtualiza, leituraCategoriaAtualizada.resultado);
            mostrarResultado(categoriaAtualidada)
            break;


        case '--excluirCategoria':
            const categoriaExluida = await CategoryService.deleteCategory(parametro1)
            mostrarResultado(categoriaExluida)
            break;

        default:
            console.log('comando invalido')
            break;
    }
}


await processarComando(argumentos);


