'use Strict'

/*------------------------------------------------------------------*/
// Modelo de vehiculo.ts
/*------------------------------------------------------------------*/

export class Vehiculo {
    constructor(
        public _id: String,
        public matricula: String,
        public tipo: String,
        public modelo: String,
        public color: String,
        public cliente: String,
    ) { }
};