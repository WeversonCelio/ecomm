const contasJSON = require('./ecomm-contas.json');
 use ("ecomm")


const constas = contasJSON.map((conta)=>{
    conta = {...conta,... { "dataCriacao": new Date() }}
        return conta
})


 const contasInseridas = db.accounts.insertMany(constas);
 console.log(contasInseridas)




//TESTE VALIDACOES
console.log("validacaoEnderecoSemComplemento")
const validacaoEnderecoSemComplemento = db.accounts.insertOne(
    {
        "username": "Joao Marcos",
        "email": "joaomarcos@dominio.com",
        "senha":"4456790",
        "dataCriacao": new Date(),
        "cpf": "35422138023",
        "telefone": "28737374737",
        "endereco": {
            "bairro": "Lagoinha",
            "rua": "Rua Ana Sobral",
            "numero": "315",
            "cep": "76829634",
            "cidade": "Porto Velho",
            "uf": "RO"

        }
    });

console.log(validacaoEnderecoSemComplemento)


console.log("validacaoEnderecoIncorreto")
const validacaoEnderecoIncorreto = db.accounts.insertOne(
    {
        "username": "Joao Marcos 2",
        "email": "joaomarcos@dominio.com",
        "senha":"4456790",
        "dataCriacao": new Date(),
        "cpf": "35422138023",
        "telefone": "28737374737",
        "endereco": {
            "bairro": 11111,
            "rua": "Rua Ana Sobral",
            "numero": "315",
            "cep": "76829634",
            "cidade": "Porto Velho",
            "uf": "RO"

        }
    });

console.log(validacaoEnderecoIncorreto)




console.log("validacaoCPFPequeno")
const validacaoCPFPequeno = db.accounts.insertOne(
    {
        "username": "Joao Marcos 3",
        "email": "joaomarcos@dominio.com",
        "senha":"4456790",
        "dataCriacao": new Date(),
        "cpf": "3523",
        "telefone": "28737374737",
        "endereco": {
            "bairro": 11111,
            "rua": "Rua Ana Sobral",
            "numero": "315",
            "cep": "76829634",
            "cidade": "Porto Velho",
            "uf": "RO"

        }
    });

console.log(validacaoCPFPequeno)







