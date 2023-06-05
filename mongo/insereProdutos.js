const produtosJSON = require('./ecomm-produtos.json');
use ("ecomm")

const produtosPadronizados = produtosJSON.map((produto) => {
    ({ nome, descricao, slug, preco_unitario: preco, quantidade_em_estoque: estoque, categoria } = produto);
    produto = {
        nome,
        descricao,
        slug, 
        preco: NumberDecimal(preco.toFixed(2)),
        estoque,
        categoria
    }
    return produto
});

const produtosInseridos = db.products.insertMany(produtosPadronizados);

console.log(produtosInseridos)