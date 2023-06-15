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
            const response = await fetch(URL_SERVER, { method: "GET" });
            const listaDeCategorias = await response.json();
            return { statusCode: 200, resultado: listaDeCategorias };

        } catch (error) {
            return { statusCode: 500, resultado: (`Ocorreu um erro no servidor ${error}`) };
        }
    }

    static async findCategoryById(id) {
        const url = `${URL_SERVER}/${id}`;
        try {
            const response = await fetch(url, { method: "GET" });
            const categoriaEncontrada = await response.json();

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
            const response = await fetch(URL_SERVER, {
                method: "POST",
                body: JSON.stringify(novaCategoria),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            });
            const categoriaInserida = await response.json();
            return { statusCode: 201, resultado: categoriaInserida };

        } catch (error) {
            return { statusCode: 500, resultado: (`Ocorreu um erro no servidor ${error}`) };
        }
    }

    // METODO PUT
    static async updateCategory(id, categoria) {
        const categoriaStatus = (await this.findCategoryById(id)).statusCode;
        if (categoriaStatus === 404) {
            return { statusCode: 404, resultado: "categoria não encontrada" }
        }

        const url = `${URL_SERVER}/${id}`;
        try {
            const response = await fetch(url, {
                method: 'PUT',
                body: JSON.stringify(categoria),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            });

            const categoriaAtualidada = await response.json();
            return { statusCode: 200, resultado: categoriaAtualidada };

        } catch (error) {
            return { statusCode: 500, resultado: (`Ocorreu um erro no servidor ${error}`) };
        }
    }
    // METODO DELETE
    static async deleteCategory(id) {
        const categoriaStatus = (await this.findCategoryById(id)).statusCode;
        if (categoriaStatus === 404) {
            return { statusCode: 404, resultado: "categoria não encontrada" }
        }

        const url = `${URL_SERVER}/${id}`;
        try {
            const response = await fetch(url, {
                method: 'DELETE'
            });
            const categoriaExcluida = await response.json();

            return { statusCode: 200, resultado: categoriaExcluida };
        } catch (error) {
            return { statusCode: 500, resultado: (`Ocorreu um erro no servidor ${error}`) };
        }
    }
}