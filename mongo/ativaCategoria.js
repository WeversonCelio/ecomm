use ("ecomm")
const categories = db.categories.updateOne({'nome':'ESPORTE'},{$set:{'status':'ATIVA'}})
console.log(categories)
