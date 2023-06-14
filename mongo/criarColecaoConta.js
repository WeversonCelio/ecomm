use("ecomm")
const colecaoConta = db.createCollection('accounts', {
    validator: {

        $jsonSchema: {
            bsonType: 'object',
            additionalProperties: false,
            required: [
                '_id',
                'username',
                'email',
                'senha',
                'dataCriacao',
                'cpf',
                'telefone',
                'endereco'
            ],
            properties: {
                _id: {
                    bsonType: 'objectId'
                },
                username: {
                    bsonType: 'string',
                    minLength: 5,
                    description: 'informe corretamente  o usuario da conta'
                },
                email: {
                    bsonType: 'string',
                    minLength: 5,
                    description: 'informe corretamente  o email da conta'
                },
                senha: {
                    bsonType: 'string',
                    minLength: 5,
                    description: 'informe corretamente  a senha da conta'
                },
                dataCriacao: {
                    bsonType: 'date',
                    description: 'informe corretamente  a data de criacao da conta'
                },
                cpf: {
                    bsonType: 'string',
                    minLength: 11,
                    maxLength: 11,
                    description: 'informe corretamente  o CPF da conta'
                },
                telefone: {
                    bsonType: 'string',
                    minLength: 10,
                    description: 'informe corretamente  o telefone da conta'
                },
                endereco: {
                    bsonType: "object",
                    required: [
                        'bairro',
                        'rua',
                        'numero',
                        'cep',
                        'cidade',
                        'uf'],
                    additionalProperties: false,
                    properties: {
                        bairro: {
                            bsonType: 'string',
                            minLength: 1,
                            description: 'informe corretamente o bairro do endereco da conta'
                        },
                        rua: {
                            bsonType: 'string',
                            minLength: 1,
                            description: 'informe corretamente a rua do endereco da conta'
                        },
                        numero: {
                            bsonType: 'string',
                            minLength: 1,
                            description: 'informe corretamente o numero do endereco da conta'
                        },
                        complemento: {
                            bsonType: "string",
                        },
                        cep: {
                            bsonType: 'string',
                            minLength: 8,
                            maxLength: 8,
                            description: 'informe corretamente o CEP do endereco da conta'
                        },
                        cidade: {
                            bsonType: 'string',
                            minLength: 5,
                            description: 'informe corretamente a cidade do endereco da conta'
                        },
                        uf: {
                            bsonType: 'string',
                            minLength: 2,
                            maxLength: 2,
                            description: 'informe corretamente a UF do endereco da conta'
                        }


                    }
                }
            }
        }


    }
})

console.log(colecaoConta)
