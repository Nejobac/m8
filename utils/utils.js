import * as userController from '../controllers/user.controller.js'
import * as bootcampController from '../controllers/bootcamp.controller.js'
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const parentDirectory = path.dirname(__dirname);
/* const viewPath = path.join(parentDirectory, 'views');
console.log(viewPath); */




export async function createUsers() {
    await userController.createUser('Mateo', 'Díaz', 'mateo.diaz@correo.com');
    await userController.createUser('Santiago', 'Mejías', 'santiago.mejias@correo.com');
    await userController.createUser('Lucas', 'Rojas', 'lucas.rojas@correo.com');
    await userController.createUser('Facundo', 'Fernandez', 'facundo.fernandez@correo.com');
};

export async function createBootcamps() {
    await bootcampController.createBootcamp('Introduciendo El Bootcamp De React.', 10, 'React es la librería más usada en JavaScript para el desarrollo de interfaces.');
    await bootcampController.createBootcamp('Bootcamp Desarrollo Web Full Stack.', 12, 'Crearás aplicaciones web utilizando las tecnologías y lenguajes más actuales y populares, como: JavaScript, nodeJS, Angular, MongoDB, ExpressJS.');
    await bootcampController.createBootcamp('Bootcamp Big Data, Inteligencia Artificial & Machine Learning.', 18, 'Domina Data Science, y todo el ecosistema de lenguajes y herramientas de Big Data, e intégralos con modelos avanzados de Artificial Intelligence y Machine Learning.');
};

export async function addUser() {
    await bootcampController.addUser(1, 1);
    await bootcampController.addUser(1, 2);
    await bootcampController.addUser(2, 1);
    await bootcampController.addUser(3, 1);
    await bootcampController.addUser(3, 2);
    await bootcampController.addUser(3, 3);
};

export async function insertData () {
    await createUsers();
    await createBootcamps();
    await addUser();
};

export async function queriesDrilling() {
    console.log('• Consultando el Bootcamp por id con sus usuarios\n');
    await bootcampController.findById(2);
    
    console.log('• Listando todos los Bootcamps con sus usuarios\n');
    await bootcampController.findAll();
    
    console.log('• Consultando un usuario por id con sus Bootcamps\n');
    await userController.findUserById(3);
    
    console.log('• Listando los usuarios con sus Bootcamps\n');
    await userController.findAll();
    
    console.log('• Actualizando el usuario según su id; por ejemplo: actualizar el usuario con id=1 por Pedro Sánchez\n');
    await userController.updateUserById(1, 'Pedro Sánchez');
    
    console.log('• Eliminando un usuario por id; por ejemplo: el usuario con id=1\n');
    await userController.deleteUserById(1);
};

export default parentDirectory