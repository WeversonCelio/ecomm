use("ecomm")
const colecaoConta = db.createCollection('orders', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            additionalProperties: false,
            required: [
                '_id',
                'dataPedido',
                'account',
                'enderecoEntrega',
                'pedido'
            ],
            properties: {
                _id: {
                    bsonType: 'objectId'
                },
                dataPedido: {
                    bsonType: 'date',
                    description: 'informe corretamente  a data de criacao da conta'
                },
                account: {
                    bsonType: "object",
                    additionalProperties: false,
                    required: [
                        'accountId',
                        'username'
                    ],
                    properties: {
                        accountId: {
                            bsonType: 'objectId'
                        },
                        username: {
                            bsonType: 'string'
                        }
                    }
                },
                enderecoEntrega: {
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
                },
                 pedido: {
                    bsonType: "array",
                    required: [
                        'productId',
                        'quantidade',
                        'precoUnitario'
                    ],
                    additionalProperties: false,
                    properties: {
                        productId: {
                            bsonType: 'objectId'
                        },
                        quantidade:{
                            bsonType: 'number',
                            minimum:1

                        },
                        precoUnitario:{
                            bsonType: 'decimal',
                            exclusiveMinimum: true,
                            minimum:0
                        },
                        desconto:{
                            bsonType: 'decimal',
                            exclusiveMinimum: true,
                            minimum:0

                        }
                    }

                }
            }
        }


    }
})

console.log(colecaoConta)
