export default class Contacto{
    #id;
    #nombre;
    #apellido;
    #telefono;
    #email;
    #imagen;
    #notas;
    constructor(nombre, apellido, telefono, email, imagen, notas){
        this.#id = crypto.randomUUID();//necesito un identificador unico
        this.#nombre = nombre;
        this.#apellido = apellido;
        this.#telefono = telefono;
        this.#email= email;
        this.#imagen=imagen;
        this.#notas=notas;
    }

    //agregar los get y set
    get id() {
        return this.#id;
    }

    get nombre() {
        return this.#nombre;
    }

    get apellido() {
        return this.#apellido;
    }

    get telefono() {
        return this.#telefono;
    }

    get email() {
        return this.#email;
    }

    get imagen() {
        return this.#imagen;
    }

    get notas() {
        return this.#notas;
    }
    //metodo para el stringify
    toJSON(){
        return{
            id: this.id,
            nombre: this.nombre,
            apellido: this.apellido,
            email: this.email,
            telefono: this.telefono,
            notas: this.notas,
            imagen: this.imagen
        }
    }
}
