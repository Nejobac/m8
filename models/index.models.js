import User from "./user.model.js";
import Bootcamp from "./bootcamp.model.js";

import {db} from '../configs/sequelize.config.js';

User.belongsToMany(Bootcamp, {
    through: "user_bootcamp",
    as: "bootcamps",
    foreignKey: "user_id",
});
Bootcamp.belongsToMany(User, {
    through: "user_bootcamp",
    as: "users",
    foreignKey: "bootcamp_id",
});

export async function run() {
    try {
        await db.sync({ force: true });
        // await insertData();
    } catch (error) {
        console.error(
            "Something went wrong with the SYNC of the table User",
            error
        );
    }
}