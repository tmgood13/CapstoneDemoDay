import { Request } from '../request/request.class';
import { Product } from '../product/product.class';

export class RequestLine {

    id: number = 0;
    requestId: number;
    productId: number = 126;
    quantity: number = 1;

    rltotal: number = 0;    
    
    request: Request;
    product: Product;
    

    constructor(){}
}