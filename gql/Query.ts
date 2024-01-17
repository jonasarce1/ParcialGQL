import { ContactoModelType, ContactoModel } from "../db/ContactoDB.ts"
import mongoose from "mongoose";
import { GraphQLError } from "graphql";

export const Query = {
    getContactos: async(): Promise<Array<{nombre: string, apellido1: string, apellido2: string, dni: string}>> => {
        const contactos = await ContactoModel.find().exec();

        //EN GRAPHQL ELIGE EL USUARIO YA LO QUE QUIERE VER

        const contactosCortos = contactos.map(function (contacto) {
            return {
                nombre: contacto.nombre,
                apellido1: contacto.apellido1,
                apellido2: contacto.apellido2,
                dni: contacto.dni
            }
        })
        return contactosCortos;
    },

    getContacto: async(_:unknown, args:{dni:string}): Promise<ContactoModelType> => {
        try{
            const contacto = await ContactoModel.findOne({dni:args.dni}).exec();

            if(!contacto){
                throw new GraphQLError("No se pudo encontrar el contacto con ese dni");
            }

            return contacto;
        }catch(error){
            if(error instanceof mongoose.Error.ValidationError){
                const validationErrors = Object.keys(error.errors).map(
                    (key) => error.errors[key].message
                );
                throw new GraphQLError("Error de validacion: " + validationErrors.join(", "));
            }else{
                throw new GraphQLError(error.message);
            }
        }
    }
};

