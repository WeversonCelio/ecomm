/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
import request from 'supertest';
import {
  describe, it, afterEach, beforeEach, expect,
} from '@jest/globals';
import app from '../../src/main.js';

const URN_PUBLICA = '/api/products';
const URN_ADMIN = '/api/admin/products';

let server;
beforeEach(() => {
  const port = 3001;
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

describe(`GET em /api/produto ${URN_PUBLICA}`, () => {
  it('Deve retornar uma lista uma de produtos', async () => {
    const resposta = await request(app)
      .get(URN_PUBLICA)
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);

    expect(resposta.body[0].nome).toEqual('Notebook Samsung');
  });
});

const produto = {
  nome: 'TESTE PRODUTO',
  slug: 'teste-produto',
  precoUnitario: {
    $numberDecimal: '1000.00',
  },
  quantidadeEstoque: 1000,
  categoria: '64945c036cb00b192e5f7dcb',
};

let idResposta;
let produtoResposta;
describe(`POST em  ${URN_ADMIN}`, () => {
  it('Deve adicionar uma nova produto', async () => {
    const resposta = await request(app)
      .post(URN_ADMIN)
      .send(produto)
      .expect(201);

    produtoResposta = resposta.body;
    idResposta = resposta.body._id;
  });

  const produtoIncompleta = {
    nome: 'TESTE',
  };

  it('Deve adicionar uma nova produto', async () => {
    await request(app)
      .post(URN_ADMIN)
      .send(produtoIncompleta)
      .expect(400);
  });
});

describe(`GET em  ${URN_PUBLICA}/:id`, () => {
  it('Deve retornar uma produto', async () => {
    const resposta = await request(app)
      .get(`${URN_PUBLICA}/${idResposta}`)
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);

    expect(resposta.body.nome).toEqual(produtoResposta.nome);
  });

  it('500 - Server Error em GET ID', async () => {
    await request(app)
      .get(`${URN_PUBLICA}/ABC123`)
      .expect(500);
  });
});

describe(`PUT em  ${URN_ADMIN}/:id`, () => {
  const produtoAlterado = {
    quantidadeEstoque: 1,
  };
  it('Deve alterar uma produto', async () => {
    await request(app)
      .put(`${URN_ADMIN}/${idResposta}`)
      .send(produtoAlterado)
      .expect(200);

    const resposta = await request(app).get(`${URN_PUBLICA}/${idResposta}`);

    expect(resposta.body.quantidadeEstoque).toEqual(produtoAlterado.quantidadeEstoque);
  });

  it('500 - Server Error em PUT', async () => {
    await request(app)
      .put(`${URN_ADMIN}/ABC12334`)
      .send(produtoAlterado)
      .expect(500);
  });
});

describe(`DELETE em  ${URN_ADMIN}:id`, () => {
  it('Deve deletar o recurso adicionado', async () => {
    await request(app)
      .delete(`${URN_ADMIN}/${idResposta}`)
      .expect(200);
  });

  it('500 - Server Error em DELETE', async () => {
    await request(app)
      .delete(`${URN_ADMIN}/ABC12334`)
      .expect(500);
  });
});

describe('404 - NOT FOUND nas rotas', () => {
  it('Deve retornar 404 - NOT FOUND em DELETE', async () => {
    await request(app)
      .delete(`${URN_ADMIN}/${idResposta}`)
      .expect(404);
  });

  it('Deve retornar 404 - NOT FOUND em PATCH', async () => {
    await request(app)
      .patch(`${URN_ADMIN}/ativar/${idResposta}`)
      .expect(404);
  });

  it('Deve retornar 404 - NOT FOUND em PUT', async () => {
    const produtoAlterada = {
      status: 'INATIVA',
    };
    await request(app)
      .put(`${URN_ADMIN}/${idResposta}`)
      .send(produtoAlterada)
      .expect(404);
  });

  it('Deve retornar 404 - NOT FOUND em GET ID', async () => {
    await request(app)
      .get(`${URN_PUBLICA}/${idResposta}`)
      .expect(404);
  });
});
