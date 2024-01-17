import { ContactoModelType } from "../db/ContactoDB.ts"
import mongoose from "mongoose";
import { GraphQLError } from "graphql";

export const ContactoGQL = {
    ciudad: async(parent: ContactoModelType):Promise<string> => {
        try{
            const BASE_URL = "https://zip-api.eu/api/v1/info/";
            const url = `${BASE_URL}${parent.iso}-${parent.cp}`;

            const data = await fetch(url);
            if(data.status != 200){
                throw new GraphQLError("No se pudo encontrar la ciudad");
            }

            const json = await data.json();

            return json.place_name;
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

    pais: async(parent: ContactoModelType):Promise<string> => {
        try{
            const BASE_URL = "https://restcountries.com/v3.1/alpha/";
            const url = `${BASE_URL}${parent.iso}`;

            const data = await fetch(url);
            if(data.status != 200){
                throw new GraphQLError("No se pudo encontrar el pais");
            }

            const json = await data.json();

            return json[0].name.common;
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

    hora: async(parent: ContactoModelType): Promise<string>  => {
        try{
            const BASE_URL = "https://restcountries.com/v3.1/alpha/";
            const url = `${BASE_URL}${parent.iso}`;

            const data = await fetch(url);
            if(data.status != 200){
                throw new GraphQLError("No se pudo encontrar la capital y region para calcular la hora");
            }

            const json = await data.json();

            const capital = json[0].capital;
            const region = json[0].region;

            const BASE_URL2 = "http://worldtimeapi.org/api/timezone/";
            const url2 = `${BASE_URL2}${region}/${capital}`;

            const data2 = await fetch(url2);
            if(data2.status != 200){
                throw new GraphQLError("No se pudo encontrar la hora actual");
            }

            const json2 = await data2.json();

            return json2.datetime;
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

    condicionesMeteo: async(parent: ContactoModelType): Promise<string> => {
        try{

            const BASE_URL1 = "https://zip-api.eu/api/v1/info/";
            const url1 = `${BASE_URL1}${parent.iso}-${parent.cp}`;

            const data1 = await fetch(url1);
            if(data1.status != 200){
                throw new GraphQLError("No se pudo encontrar la ciudad");
            }

            const json1 = await data1.json();

            const ciudad = json1.place_name;

            const BASE_URL = "http://api.weatherapi.com/v1/current.json?key=";
            const WEATHER_API = Deno.env.get("WEATHER_API");

            const url = `${BASE_URL}${WEATHER_API}&q=${ciudad}`;

            const data = await fetch(url);
            if(data.status != 200){
                throw new GraphQLError("No se pudo encontrar la condicion meteorologica");
            }

            const json = await data.json();

            return json.current.condition.text;
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

