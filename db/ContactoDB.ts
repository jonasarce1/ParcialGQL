import mongoose, {InferSchemaType} from "mongoose";


const Schema = mongoose.Schema;

const ContactoSchema = new Schema({
    dni: {type: String, required: true, unique: true},
    nombre: {type: String, required: true},
    apellido1: {type: String, required: true},
    apellido2: {type: String, required: true},
    email: {type: String, required: true},
    cp: {type: String, required: true},
    iso: {type: String, required: true},
    ciudad: {type: String, required: false},
    pais: {type: String, required: false},
    hora: {type: String, required: false},
    condicionesMeteo: {type: String, required: false},
})

ContactoSchema.path("dni").validate(function (dni: string) {
    if(!/^\d{8}[a-zA-Z]$/.test(dni)){
        throw new Error("El dni no es valido");
    }
    return true;
})

ContactoSchema.path("email").validate( function (email: string) {
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        throw new Error("El email no es valido");
    }
    return true;
})

ContactoSchema.path("iso").validate(function(iso: string) {
    if(!/^[A-Z]{2}$/.test(iso)){
        throw new Error("El iso no es valido");
    }
    return true;
})

export type ContactoModelType = mongoose.Document & InferSchemaType<typeof ContactoSchema>;

export const ContactoModel = mongoose.model<ContactoModelType>("Contacto", ContactoSchema); //"Contacto" es el nombre de la coleccion en la base de datos
