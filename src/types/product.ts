import { Produit } from "../payload-types";

export interface Product extends Produit {
    quantity: number;
    color: string;
} 