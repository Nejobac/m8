import {Sequelize} from "sequelize";

import * as dotenv from "dotenv";
import "dotenv/config";


// 1. Creamos la base de datos
const db = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASS, {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
})

// 2. Sincronozamos con la base de datos
async function syncDB () {
  try {
    await db.authenticate()
    console.log('Connections has been established successfully');
  }
  catch(error) {
    console.error('Unable to connect to database', error)
  }
}
syncDB()

export {db, Sequelize}