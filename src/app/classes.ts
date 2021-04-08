
/**
 * This is a model class which has the attributes to keep User properties
 */
 export class User {
    //_id?:           string      =   "";
    uCart:          Cart[]      =   [];
    uCredentials:   Credentials =   new Credentials();
    message:        string      =   "";
}

export class Cart {
    p_Id!: string;
    // sEmail!: string;
    pQuantity!: number;
    pPrice!:Number;
    // message: string;
    // uCart:any[]
}

export class Credentials {
    uEmail!: string;
    uPass!: string;
}



