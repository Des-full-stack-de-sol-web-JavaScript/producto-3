import { getDB } from '../config/mongo.js';
import { ObjectId } from 'mongodb';

/**
 * Función auxiliar para obtener la colección 'voluntariados'
 */
function getCollection() {
  return getDB().collection('voluntariados');
}

/**
 * Devuelve todos los voluntariados de la BD
 * @returns {Promise<Array>} Un array de todos los voluntariados
 */
export async function getAllVoluntariados() {
  try {
    return await getCollection().find({}).toArray();
  } catch (error) {
    throw new Error(`Error al obtener voluntariados: ${error.message}`);
  }
}

/**
 * Devuelve un voluntariado por su ID
 * @param {string} id - El ID del voluntariado
 * @returns {Promise<object|null>} El documento del voluntariado o null
 */
export async function getVoluntariadoById(id) {
  try {
    if (!ObjectId.isValid(id)) {
      return null;
    }
    return await getCollection().findOne({ _id: new ObjectId(id) });
  } catch (error) {
    throw new Error(`Error al obtener voluntariado por ID: ${error.message}`);
  }
}

/**
 * Añade un nuevo voluntariado a la BD
 * @param {object} data - Los datos del nuevo voluntariado
 * @returns {Promise<object>} El voluntariado recién creado
 */
export async function addVoluntariado(data) {
  try {
    const result = await getCollection().insertOne(data);
    return await getCollection().findOne({ _id: result.insertedId });
  } catch (error) {
    throw new Error(`Error al añadir voluntariado: ${error.message}`);
  }
}

/**
 * Actualiza un voluntariado existente en la BD
 * @param {string} id - El ID del voluntariado a actualizar
 * @param {object} data - Los nuevos datos
 * @returns {Promise<object|null>} El voluntariado actualizado o null
 */
export async function updateVoluntariado(id, data) {
  try {
    if (!ObjectId.isValid(id)) {
      return null;
    }

    await getCollection().updateOne(
      { _id: new ObjectId(id) },
      { $set: data }
    );
    
    return await getCollection().findOne({ _id: new ObjectId(id) });
  } catch (error) {
    throw new Error(`Error al actualizar voluntariado: ${error.message}`);
  }
}

/**
 * Elimina un voluntariado por su ID
 * @param {string} id - El ID del voluntariado a eliminar
 * @returns {Promise<boolean>} True si se eliminó, false si no
 */
export async function deleteVoluntariado(id) {
  try {
    if (!ObjectId.isValid(id)) {
      return false;
    }
    
    const result = await getCollection().deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount === 1;
  } catch (error) {
    throw new Error(`Error al eliminar voluntariado: ${error.message}`);
  }
}