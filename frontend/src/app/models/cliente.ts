'use Strict'

/*------------------------------------------------------------------*/
// Modelo de cliente.ts
/*------------------------------------------------------------------*/

export class Cliente {
    constructor(
        public _id: String,
        public name: String,
        public phone: String,
        public license: String,
        public typeLicense: String,
        public image: String,
        public avales: String
    ) { }
};