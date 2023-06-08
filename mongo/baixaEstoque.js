use("ecomm")

function baixarEstoque(productId, quantidadeSolicitada, quantidadeEstoque ){
 if(quantidadeSolicitada>quantidadeEstoque){
    throw new Error("quantidade no estoque insuficiente")
 }
 const novoEstoque =   quantidadeEstoque - quantidadeSolicitada
 query = db.products.updateOne({ "_id": productId }, {$set:{"estoque":novoEstoque}})
 console.log(novoEstoque, query)

}


//teste
const produto = db.products.findOne({"nome":'Galaxy Tab S8'})
const productId = produto._id
const  quantidadeSolicitada = 2
const quantidadeEstoque = produto.estoque


baixarEstoque(productId, quantidadeSolicitada, quantidadeEstoque )