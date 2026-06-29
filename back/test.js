const db = require('./config/db');

async function testar() {
    try {
        const resultado = await db.query('SELECT NOW()');

        console.log(resultado.rows);

    } catch (erro) {

        console.error(erro);

    }
}

testar();