const URL_SERVER = 'http://127.0.0.1:3000/categories';

function objetoEstaVazio(objeto) {
  return (Object.entries(objeto).length === 0);
}

export default class CategoryService {
  // METODOS GET
  static async findCategories() {
    try {
      const response = await fetch(URL_SERVER, { method: 'GET' });
      const listaDeCategorias = await response.json();
      return { statusCode: response.status, resultado: listaDeCategorias };
    } catch (error) {
      return { statusCode: 500, resultado: (`Ocorreu um erro no servidor ${error}`) };
    }
  }

  static async findCategoryById(id) {
    const url = `${URL_SERVER}/${id}`;
    try {
      const response = await fetch(url, { method: 'GET' });
      const categoriaEncontrada = await response.json();

      return (!objetoEstaVazio(categoriaEncontrada) ? {
        statusCode: response.status, resultado: categoriaEncontrada,
      } : {
        statusCode: response.status, resultado: 'categoria não encontrada',
      });
    } catch (error) {
      return { statusCode: 500, resultado: (`Ocorreu um erro no servidor ${error}`) };
    }
  }

  // METODO POST
  static async createCategory(categoria) {
    let novoId;
    try {
      console.log('categoria', categoria);

      const listaDeCategorias = (await CategoryService.findCategories()).resultado;
      let maiorId = listaDeCategorias[0].id;
      listaDeCategorias.forEach((el) => {
        if (maiorId < el.id) {
          maiorId = el.id;
        }
      });
      maiorId += 1;
    } catch (error) {
      return { statusCode: 500, resultado: (`Ocorreu um erro no servidor ${error}`) };
    }

    const novaCategoria = {
      id: novoId,
      nome: categoria.nome,
      status: categoria.status,
    };

    try {
      const response = await fetch(URL_SERVER, {
        method: 'POST',
        body: JSON.stringify(novaCategoria),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      });
      const categoriaInserida = await response.json();
      return { statusCode: response.status, resultado: categoriaInserida };
    } catch (error) {
      return { statusCode: 500, resultado: (`Ocorreu um erro no servidor ${error}`) };
    }
  }

  // METODO PUT
  static async updateCategory(id, categoria) {
    const categoriaStatus = (await this.findCategoryById(id)).statusCode;
    if (categoriaStatus === 404) {
      return { statusCode: categoriaStatus, resultado: 'categoria não encontrada' };
    }

    const url = `${URL_SERVER}/${id}`;
    try {
      const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(categoria),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      });

      const categoriaAtualidada = await response.json();
      return { statusCode: response.status, resultado: categoriaAtualidada };
    } catch (error) {
      return { statusCode: 500, resultado: (`Ocorreu um erro no servidor ${error}`) };
    }
  }

  // METODO DELETE
  static async deleteCategory(id) {
    const categoriaStatus = (await this.findCategoryById(id)).statusCode;
    if (categoriaStatus === 404) {
      return { statusCode: categoriaStatus, resultado: 'categoria não encontrada' };
    }

    const url = `${URL_SERVER}/${id}`;
    try {
      const response = await fetch(url, {
        method: 'DELETE',
      });
      const categoriaExcluida = await response.json();

      return { statusCode: response.status, resultado: categoriaExcluida };
    } catch (error) {
      return { statusCode: 500, resultado: (`Ocorreu um erro no servidor ${error}`) };
    }
  }
}
