import User from '../models/users.model.js';
import Bootcamp from '../models/bootcams.models.js';

// • Crear y guardar usuarios llamado createUser.
export async function createUser(nombre, email) {
    try {
        let user = await User.create({ nombre, email });
        console.log(`>> Se ha creado el usuario: ${JSON.stringify(user, null, 4)}`)
    } catch (error) {
        console.log(`>> Error al crear el usuario ${error}`);
    }
};

// • Obtener los Bootcamp de un usuario llamado findUserById.
export async function findUserById(id) {
    try {
        let bootcampByUser = await User.findByPk(id, {
            include: [{
                model: Bootcamp,
                as: 'bootcamps',
                attributes: ['id', 'title'],
                through: {
                    attributes: [],
                }
            }]
        });
        bootcampByUser = JSON.stringify(bootcampByUser, null, 2);
        console.log(bootcampByUser);
        return bootcampByUser;
    } catch (error) {
        console.log(`>> Error mientras se encontraba el usuario: ${error}`)
    }
};
// • Obtener todos los Usuarios incluyendo, los Bootcamp llamado findAll.
export async function findAll() {
    try {
        let users = await User.findAll({
            include: [{
                model: Bootcamp,
                as: 'bootcamps',
                attributes: ['id', 'title'],
                through: {
                    attributes: [],
                }
            }]
        })
        users = JSON.stringify(users, null, 2);
        console.log(users);
        return users;
    } catch (error) {
        console.log(`>> Error mientras se encontraba los usuarios: ${error}`)
    }
};

// • Actualizar usuario por Id llamado updateUserById.
export async function updateUserById(id, firstName) {
    try {
        await User.update({ firstName }, { where: { id } });
        let user = await User.findByPk(id);
        console.log(user.dataValues);
    } catch (error) {
        console.log(`>> Error mientras se actualizaba el usuario: ${error}`)
    }
};

// • Eliminar un usuario por Id llamado deleteUserById.
export async function deleteUserById(id) {
    try {
        await User.destroy({ where: { id } });
        console.log(`Usuario con id ${id} ha sido eliminado`);
    } catch (error) {
        console.log(`>> Error mientras se eliminada el usuario: ${error}`)
    }
};
