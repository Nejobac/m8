import User from '../models/users.model.js';
import Bootcamp from '../models/bootcams.models.js';

// • Crear y guardar un nuevo Bootcamp llamado createBootcamp.
export async function createBootcamp(title, cue, description) {
    try {
        let bootcamp = await Bootcamp.create({title, cue, description});
        console.log(`>> Se ha creado el bootcamp: ${JSON.stringify(bootcamp, null, 4)}`)
    } catch (error) {
        console.log(`>> Error al crear el bootcamp ${error}`);
    }
};

// • Agregar un Usuario al Bootcamp llamado addUser.
export async function addUser(bootcamp_Id, user_id) {
    try {
        const bootcamp = await Bootcamp.findByPk(bootcamp_Id)
        const user = await User.findByPk(user_id);
        if(!bootcamp || !user) {
            !bootcamp? console.log("No se encontro el bootcamp!") : console.log("No se encontro el user!"); 
            return null;
        };
        bootcamp.addUser(user);
        console.log('***************************');
        console.log(`>> Agregado el usuario id=${user.id} al bootcamp con id=${bootcamp.id}`); 
        console.log('***************************')
    } catch (error) {
        console.log(">> Error mientras se estaba agregando Usuario al Bootcamp", error);
    }
};

// • Obtener los Bootcamp por id llamado findById.
export async function findById(id) {
    try {
        let bootcamp = await Bootcamp.findByPk(id, {
            include: [{
                model: User,
                as: 'users',
                attributes: ['id', 'firstName'],
                through: {
                    attributes: [],
                }
            }]
        });
        bootcamp = JSON.stringify(bootcamp, null, 2);
        console.log(bootcamp);
        return bootcamp;
    } catch (error) {
        console.log(`>> Error mientras se encontraba el bootcamp: ${error}`)
    }
};

// • Obtener todos los Usuarios incluyendo los Bootcamp llamado findAll.
export async function findAll(){
    try {
        let bootcamps = await Bootcamp.findAll({
            include: [{
                model: User,
                as: 'users',
                attributes: ['id', 'firstName'],
                through: {
                    attributes: [],
                }
            }]
        });
        bootcamps = JSON.stringify(bootcamps, null, 2);
        console.log(bootcamps);
        return bootcamps;
    } catch (error) {
        console.log(`>> Error mientras se encontraba los bootcamps: ${error}`)
    }
};
