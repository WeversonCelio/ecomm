use("ecomm")
const produtosPorCategoria = db.products.find({
    "categoria": {$in:["LIVROS","CELULARES" ]}
})

console.log(produtosPorCategoria)