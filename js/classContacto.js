export default class Contacto{
    #id;
    #nombre;
    #apellido;
    #telefono;
    #email
    constructor(nombre, apellido, telefono, email){
        this.#id = crypto.randomUUID();//necesito un identificador unico
        this.#nombre = nombre;
        this.#apellido = apellido;
        this.#telefono = telefono;
        this.#email= email
    }

    //agregar los get y set
}
