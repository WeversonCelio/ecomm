


const URL_SERVER = 'http://127.0.0.1:3000/categories';

function objetoEstaVazio(objeto) {
    return (Object.entries(objeto).length === 0) ? true : false;

}
async function gerarNovoId() {
    const listaDeCategorias = (await CategoryService.findCategories()).resultado;
    let maiorId = listaDeCategorias[0].id;
    listaDeCategorias.forEach(categoria => {
        if (maiorId < categoria.id) {
            maiorId = categoria.id;
        }
    });
    return (maiorId + 1)
}
export default class CategoryService {
    // METODOS GET
    static async findCategories() {
        try {
            const listaDeCategorias = await fetch(URL_SERVER, { method: "GET" })
                .then(response => response.json());
            return { statusCode: 200, resultado: listaDeCategorias };

        } catch (error) {
            return { statusCode: 500, resultado: (`Ocorreu um erro no servidor ${error}`) };
        }
    }

    static async findCategoryById(id) {
        const url = `${URL_SERVER}/${id}`
        try {
            const categoriaEncontrada = await fetch(url, { method: "GET" })
                .then(response => response.json());

            return (!objetoEstaVazio(categoriaEncontrada) ? {
                statusCode: 200, resultado: categoriaEncontrada
            } : {
                statusCode: 404, resultado: "categoria não encontrada"
            });
        } catch (error) {
            return { statusCode: 500, resultado: (`Ocorreu um erro no servidor ${error}`) };
        }

    }

    // METODO POST
    static async createCategory(novaCategoria) {
        try {
            novaCategoria.id = await gerarNovoId();
            const categoriaInserida = await fetch(URL_SERVER, {
                method: "POST",
                body: JSON.stringify(novaCategoria),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            }).then(response => response.json());
            return { statusCode: 201, resultado: categoriaInserida };
        } catch (error) {
            return { statusCode: 500, resultado: (`Ocorreu um erro no servidor ${error}`) };
        }
    }

    // METODO PUT
    static async updateCategory(id, categoria) {
        const url = `${URL_SERVER}/${id}`
        try {
            const categoriaAtualidada = await fetch(url, {
                method: 'PUT',
                body: JSON.stringify(categoria),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            }).then(response => response.json())

            return { statusCode: 200, resultado: categoriaAtualidada };

        } catch (error) {
            return { statusCode: 500, resultado: (`Ocorreu um erro no servidor ${error}`) };

        }
    }
    // METODO DELETE
    static async deleteCategory(id) {
        const url = `${URL_SERVER}/${id}`
        try {
            const categoriaExcluida = await fetch(url, {
                method: 'DELETE'
            }).then(response => response.json())
            return { statusCode: 200, resultado: categoriaExcluida };
        } catch (error) {
            return { statusCode: 500, resultado: (`Ocorreu um erro no servidor ${error}`) };
        }
    }


}