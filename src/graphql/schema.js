import { gql } from 'graphql-tag';

/**
 * Definición del esquema GraphQL (typeDefs).
 * 
 * Aquí se describen:
 * - Tipos (Type)
 * - Consultas (Query)
 * - Mutaciones (Mutation)
 * - Inputs
 * 
 * Este esquema será cargado por Apollo Server para generar
 * el endpoint /graphql.
 */
export const typeDefs = gql`
  type User {
    _id: ID!
    nombre: String!
    email: String!
    password: String!
    rol: String
  }

  type Voluntariado {
    _id: ID!
    titulo: String!
    email: String!
    fecha: String!
    descripcion: String
    tipo: String
  }
  # Nuevo tipo para la respuesta de autenticación: token y datos del usuario
  type AuthPayload {
    token: String!
    user: User!
  }

  # Consultas permitidas
  type Query {
    users: [User!]!
    user(id: ID!): User

    voluntariados: [Voluntariado!]!
    voluntariado(id: ID!): Voluntariado
  }

  # Operaciones de escritura
  type Mutation {
<<<<<<< HEAD
    registrarUsuario(nombre: String!, email: String!, password: String!): User
=======
    login(email: String!, password: String!): AuthPayload!
    addUser(nombre: String!, email: String!, password: String!): User
>>>>>>> 06ba3a1 (Implementación de Autenticación JWT: Se integran bcrypt para hashing de contraseñas y se protegen las mutaciones sensibles en GraphQL.)
    deleteUser(id: ID!): Boolean

    addVoluntariado(
      titulo: String!
      email: String!
      fecha: String!
      descripcion: String
      tipo: String
    ): Voluntariado

    updateVoluntariado(
      id: ID!
      titulo: String
      email: String
      fecha: String
      descripcion: String
      tipo: String
    ): Voluntariado

    deleteVoluntariado(id: ID!): Boolean
  }
`;
