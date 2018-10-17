import { ProdutoDTO } from "../providers/produto/produto.dto";

export interface CartItem {
    quantidade: number,
    produto: ProdutoDTO
}