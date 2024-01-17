export const typeDefs = `#graphql
    type ContactoGQL {
        dni: String!,
        nombre: String!,
        apellido1: String!,
        apellido2: String!,
        email: String!,
        cp: String!,
        iso: String!, 
        ciudad: String,
        pais: String,
        hora: String,
        condicionesMeteo: String
    }

    type Query {
        getContactos: [ContactoGQL!]!, 
        getContacto(dni: String!): ContactoGQL!
    },

    type Mutation {
        addContacto(dni: String!, nombre: String!, apellido1: String!, apellido2: String!, email: String!, cp: String!, iso: String!):ContactoGQL!,
        putContacto(dni: String!, nombre: String!, apellido1: String!, apellido2: String!, email: String!, cp: String!, iso: String!): ContactoGQL!,
        deleteContacto(dni: String!): String!
    }

`;