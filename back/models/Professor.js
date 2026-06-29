const db = require('../config/db');

class Professor {

    static async getAll() {
        const resultado = await db.query(
            'SELECT * FROM professor ORDER BY id'
        );

        return resultado.rows;
    }

    static async getById(id) {
        const resultado = await db.query(
            'SELECT * FROM professor WHERE id = $1',
            [id]
        );

        return resultado.rows[0];
    }

    static async insert({ nome, email, sala }) {
        const resultado = await db.query(
            `INSERT INTO professor (nome, email, sala)
             VALUES ($1,$2,$3)
             RETURNING *`,
            [nome, email, sala]
        );

        return resultado.rows[0];
    }

    static async update(id, { nome, email, sala }) {
        const resultado = await db.query(
            `UPDATE professor
             SET nome=$1,
                 email=$2,
                 sala=$3
             WHERE id=$4
             RETURNING *`,
            [nome, email, sala, id]
        );

        return resultado.rows[0];
    }

    static async delete(id) {
        await db.query(
            'DELETE FROM professor WHERE id=$1',
            [id]
        );

        return {
            mensagem: 'Professor excluído com sucesso'
        };
    }

}

module.exports = Professor;