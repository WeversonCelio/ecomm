use("ecomm")
const colecaoConta = db.runCommand({
    collMod: 'accounts',
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
                    pattern: "^[a-z0-9]+(\\.[_a-z0-9]+)*@[a-z0-9-]+(\\.[a-z0-9-]+)*(\\.[a-z]{2,15})$",
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
                    pattern: "^\\d{11}$",
                    description: 'informe corretamente  o CPF da conta'
                },
                telefone: {
                    bsonType: 'string',
                    pattern: "^\\d{10,}$",
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
                            pattern: '^(\\d{1,}+|S/N+|s/n)$',
                            description: 'informe corretamente o numero do endereco da conta'
                        },
                        complemento: {
                            bsonType: "string",
                        },
                        cep: {
                            bsonType: 'string',
                            pattern: "^\\d{8}$",
                            description: 'informe corretamente o CEP do endereco da conta'
                        },
                        cidade: {
                            bsonType: 'string',
                            minLength: 5,
                            description: 'informe corretamente a cidade do endereco da conta'
                        },
                        uf: {
                            bsonType: 'string',
                            pattern: '^RO+|AC+|AM+|RR+|PA+|AP+|TO+|MA+|PI+|CE+|RN+|PB+|PE+|AL+|SE+|BA+|MG+|ES+|RJ+|SP+|PR+|SC+|RS+|MS+|MT+|GO+|DF$',
                            description: 'informe corretamente a UF do endereco da conta'
                        }


                    }
                }
            }
        }


    }
})

console.log(colecaoConta)
