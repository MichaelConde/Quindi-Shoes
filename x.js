const bcrypt = require('bcryptjs');

async function generarHash(password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Nuevo hash:", hashedPassword);
}

generarHash("111"); // Reemplaza con la contraseña real que usaste
