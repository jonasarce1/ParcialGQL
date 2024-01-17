import { ContactoModelType, ContactoModel } from "../db/ContactoDB.ts";
import mongoose from "mongoose";
import { GraphQLError } from "graphql";
import { concatAST } from "graphql";

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
    },

    putContacto: async(_:unknown, args:{dni: string, nombre: string, apellido1: string, apellido2: string, email: string, cp: string, iso: string}):Promise<ContactoModelType> => {
        try{
            const contacto = await ContactoModel.findOne({dni: args.dni}).exec();
            if(!contacto){
                throw new GraphQLError("No se ha encontrado un contacto con ese dni");
            }

            if(args.nombre){
                contacto.nombre = args.nombre;
            }

            if(args.apellido1){
                contacto.apellido1 = args.apellido1;
            }

            if(args.apellido2){
                contacto.apellido2 = args.apellido2;
            }

            if(args.email){
                contacto.email = args.email;
            }

            if(args.cp){
                contacto.cp = args.cp;
            }

            if(args.iso){
                contacto.iso = args.iso;
            }

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
    },

    deleteContacto: async(_:unknown, args:{dni: string}):Promise<string> => {
        try{
            const contactoBorrado = await ContactoModel.findOneAndDelete({dni:args.dni}).exec();
            if(!contactoBorrado){
                throw new GraphQLError("No se ha encontrado un contacto con ese dni");
            }

            return "El contacto se ha borrado exitosamente";
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