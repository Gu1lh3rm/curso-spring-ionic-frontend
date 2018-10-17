export interface ClienteNewDTO {
    nome: string,
    email: string,
    tipo : number,
    cpfOuCnpj : string,
    password : string,
    logradouro : string,
    numero : number,
    complemento : string,
    bairro : string,
    cep : string,
    telefone1 : string,
    telefone2 : string,
    telefone3 : string,
    estadoId : number,
    cidadeId : number
}