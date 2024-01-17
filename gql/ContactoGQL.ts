import { ContactoModelType, ContactoModel } from "../db/ContactoDB.ts"
import mongoose from "mongoose";
import { GraphQLError } from "graphql";

export const ContactoGQL = {
    ciudad: async(parent: ContactoModelType):Promise<string> => {
        try{
            const BASE_URL = "https://zip-api.eu/api/v1/info/";
            const url = `${BASE_URL}${parent.iso}${parent.cp}`;

            const data = await fetch(url);
            if(data.status != 200){
                throw new GraphQLError("No se pudo encontrar la ciudad");
            }

            const json = await data.json();
            
            return json.state;
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
}

