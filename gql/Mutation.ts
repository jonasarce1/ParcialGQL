import { ContactoModelType, ContactoModel } from "../db/ContactoDB.ts";
import mongoose from "mongoose";
import { GraphQLError } from "graphql";

export const Mutation = {
    addContacto: async(_:unknown, args:{dni: string, nombre: string, apellido1: string, apellido2: string, email: string, cp: string, iso: string}):Promise<ContactoModelType> => {
        try{
            const contacto = new ContactoModel({
                dni: args.dni,
                nombre: args.nombre,
                apellido1: args.apellido1,
                apellido2: args.apellido2,
                email: args.email,
                cp: args.cp,
                iso: args.iso
            })

            await contacto.save();

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