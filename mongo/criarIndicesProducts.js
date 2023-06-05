use("ecomm")

const criarIndiceNome = db.products.createIndex({ "nome": 1 })
const criarIndicePreco = db.products.createIndex({ "preco": 1 })
const criarIndiceCategoria = db.products.createIndex({ "categoria": 1 })

console.log(criarIndiceNome,"\n\n", criarIndicePreco, "\n\n",criarIndiceCategoria)
