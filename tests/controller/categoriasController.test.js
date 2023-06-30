/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
import request from 'supertest';
import {
  describe, it, afterEach, beforeEach, expect,
} from '@jest/globals';
import app from '../../src/main.js';

const URN_PUBLICA = '/api/categories';
const URN_ADMIN = '/api/admin/categories';

let server;
beforeEach(() => {
  const port = 3001;
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

describe(`GET em /api/categoria ${URN_PUBLICA}`, () => {
  it('Deve retornar uma lista uma de categorias', async () => {
    const resposta = await request(app)
      .get(URN_PUBLICA)
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);

    expect(resposta.body[0].nome).toEqual('INFORMÁTICA');
  });
});

const categoria = {
  nome: 'TESTE',
};

let idResposta;
let categoriaResposta;
describe(`POST em  ${URN_ADMIN}`, () => {
  it('Deve adicionar uma nova categoria', async () => {
    const resposta = await request(app)
      .post(URN_ADMIN)
      .send(categoria)
      .expect(201);

    categoriaResposta = resposta.body;
    idResposta = resposta.body._id;
    console.log(categoria);
    console.log(categoriaResposta);
  });

  const categoriaIncompleta = {
    status: 'ATIVO',
  };

  it('Deve adicionar uma nova categoria', async () => {
    await request(app)
      .post(URN_ADMIN)
      .send(categoriaIncompleta)
      .expect(400);
  });
});

describe(`GET em  ${URN_PUBLICA}/:id`, () => {
  it('Deve retornar uma categoria', async () => {
    const resposta = await request(app)
      .get(`${URN_PUBLICA}/${idResposta}`)
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);

    expect(resposta.body).toEqual(categoriaResposta);
  });

  it('500 - Server Error em GET ID', async () => {
    console.log(categoriaResposta);
    console.log(idResposta);
    await request(app)
      .get(`${URN_PUBLICA}/ABC123`)
      .expect(500);
  });
});

describe(`PUT em  ${URN_ADMIN}/:id`, () => {
  const categoriaAlterada = {
    status: 'INATIVA',
  };
  it('Deve alterar uma categoria', async () => {
    await request(app)
      .put(`${URN_ADMIN}/${idResposta}`)
      .send(categoriaAlterada)
      .expect(200);

    const resposta = await request(app).get(`${URN_PUBLICA}/${idResposta}`);

    expect(resposta.body.status).toEqual(categoriaAlterada.status);
  });

  it('500 - Server Error em PUT', async () => {
    await request(app)
      .put(`${URN_ADMIN}/ABC12334`)
      .send(categoriaAlterada)
      .expect(500);
  });
});

describe(`PATCH em  ${URN_ADMIN}/:id`, () => {
  it('Deve ativar uma categoria', async () => {
    await request(app)
      .patch(`${URN_ADMIN}/ativar/${idResposta}`)
      .expect(200);

    const resposta = await request(app).get(`${URN_PUBLICA}/${idResposta}`);
    expect(resposta.body.status).toEqual('ATIVA');
  });

  it('500 - Server Error em PATCH', async () => {
    await request(app)
      .patch(`${URN_ADMIN}/ativar/ABC12334`)
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
    const categoriaAlterada = {
      status: 'INATIVA',
    };
    await request(app)
      .put(`${URN_ADMIN}/${idResposta}`)
      .send(categoriaAlterada)
      .expect(404);
  });

  it('Deve retornar 404 - NOT FOUND em GET ID', async () => {
    console.log(categoriaResposta);
    console.log(idResposta);
    await request(app)
      .get(`${URN_PUBLICA}/${idResposta}`)
      .expect(404);
  });
});
