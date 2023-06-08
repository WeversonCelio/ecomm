use("ecomm")

// buscar cliente no banco
function buscarCliente(keyAccounts, valueAccounts) {
    try {
        const user = db.accounts.findOne({ [keyAccounts]: valueAccounts })
        const accountId = user._id
        const username = user.username
        const enderecoEntrega = user.endereco
        const account = { accountId, username, enderecoEntrega }
        return account;

    } catch (error) {
        console.error("cliente nao localizado :", error)
    }
}

// buscar produtos no banco 
function buscarProdutos(itens) {
    try {
        pedidos = itens.map((item) => {
            const produto = db.products.findOne({ "slug": item.slug });
            const productId = produto._id;
            const precoUnitario = produto.preco;
            const quantidade = item.quantidade

            const pedido = { productId, precoUnitario, quantidade }
            if ((item.desconto != null) && (item.desconto != undefined)) {
                pedido.desconto = item.desconto;
            }
            return pedido
        })

        return pedidos;

    } catch (error) {
        console.error("produto nao localizado :", error)
    }

}

//criar pedidos
function criarPedido(keyAccounts, valueAccounts, itens) {
    const pedido = buscarProdutos(itens)
    const cliente = buscarCliente(keyAccounts, valueAccounts)

    const account = {
        accountId: cliente.accountId,
        username: cliente.username,
    }

    const enderecoEntrega = {
        ...cliente.enderecoEntrega
    }

    order = {
        dataPedido: new Date(),
        account: account,
        enderecoEntrega: enderecoEntrega,
        pedido: pedido
    }

    return order;
}

//  itens solicitados 
const itens1 = [{
    slug: "tablet-galaxy-tab-s8",
    quantidade: 2,
},
{
    slug: "livro-clean-architecture",
    quantidade: 1,
    desconto: NumberDecimal(10.0)
}]

const itens2 = [{
    slug: "livro-building-microservices",
    quantidade: 1,
    desconto: NumberDecimal(56.5)
},
{
    slug: "celular-galaxy-22-ultra",
    quantidade: 2,
}]

// criar pedidos de 2 clientes
const pedidosCliente1 = criarPedido("email", "teorfyol@test.com", itens1)
const pedidosCliente2 = criarPedido("cpf", "76853656008", itens1)

// inserir na colecao
orders = db.orders.insertMany([{ ...pedidosCliente1 }, { ...pedidosCliente2 }])
console.log(orders)


// validacao 
//  item nao localizado
const itens3 = [{
    slug: "tablet-galaxy-tab",
    quantidade: 2,
},
{
    slug: "livro-architecture",
    quantidade: 1,
    desconto: NumberDecimal(10.0)
}]

const pedidosCliente3 = criarPedido("email", "teorfyol@test.com", itens3)
orders = db.orders.insertOne({ ...pedidosCliente3 })
console.log(orders)


//  cliente  nao localizado

const pedidosCliente4 = criarPedido("email", "teorfyol123@test.com", itens2)
orders = db.orders.insertOne({ ...pedidosCliente4 })
console.log(orders)


export const funcaoCriarPedido = criarPedido
