use("ecomm")

 
 export function baixarEstoque(productId, quantidadeSolicitada, quantidadeEstoque ){
 if(quantidadeSolicitada>quantidadeEstoque){
    throw new Error("quantidade no estoque insuficiente")
 }
 const novoEstoque =   quantidadeEstoque - quantidadeSolicitada
 query = db.products.updateOne({ "_id": productId }, {$set:{"estoque":novoEstoque}})
 console.log(novoEstoque, query)

}

