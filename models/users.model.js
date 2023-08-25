import  {db, Sequelize} from './sequelize.config.js';
import { DataTypes as dt } from 'sequelize';

const User = db.define('user', {
  firstName: {
    type: dt.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [2, 45],
        msg: 'El largo del nombre debe medir entre 2 y 45 caracteres'
      }
    }
  },
  lastName: {
    type: dt.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [2, 45],
        msg: 'El largo del apellido debe medir entre 2 y 45 caracteres'
      }
    }
  },
  email: {
    type: dt.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: {
        args: [true],
        msg: "Debe ingresar un correo válido"   
      }
    }
  },
  password: {
    type: dt.STRING,
    allowNull: false,
  }
}, {timestamps: true})
export default User