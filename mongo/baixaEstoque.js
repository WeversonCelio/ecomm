use("ecomm")

function baixarEstoque(nome, quantidadeSolicitada) {
   return db.products.updateOne({
      $and: [{
         "nome": nome
      }, {
         estoque: {
            $gte: quantidadeSolicitada
         }
      }]
   }, {
      $inc: {
         "estoque": -quantidadeSolicitada
      }
   })
}
const operacao = baixarEstoque('Galaxy Tab S8', 2)
console.log(operacao)