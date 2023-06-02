use("ecomm")

const vendaTodosLivros = db.products.updateMany({"categoria": "LIVROS"},{$set:{"estoque":0}})
console.log(vendaTodosLivros)