'use Strict'

/*------------------------------------------------------------------*/
// Modelo de vehiculo.ts
/*------------------------------------------------------------------*/

export class Vehiculo {
    constructor(
        public _id: String, //! Esto genera error al enviar el json
        public matricula: String,
        public tipo: String,
        public modelo: String,
        public color: String,
        public name: String,
    ) { }
};