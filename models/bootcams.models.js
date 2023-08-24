import {db} from '../configs/sequelize.config.js';
import { DataTypes as dt } from 'sequelize';

const Bootcamp = db.define('Bootcamp', {
    title: {
        type: dt.STRING,
        allowNull: false
    },
    cue: {
        type: dt.INTEGER,
        allowNull: false,
        validate: {
            min: 5,
            max: 20
        }
    },
    description: {
        type: dt.STRING,
        allowNull: false
    }
}, { timestamps: true});

export default Bootcamp;
