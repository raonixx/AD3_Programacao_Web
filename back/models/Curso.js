const db = require('../config/db');

class Curso {

  async getAll() {
    const result = await db.query('SELECT * FROM curso');
    return result.rows;
  }

  async getById(id) {
    const result = await db.query(
      'SELECT * FROM curso WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }

  async insert({ nome, sigla, descricao, id_coordenador }) {
    const result = await db.query(
      `INSERT INTO curso (nome, sigla, descricao, id_coordenador)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [nome, sigla, descricao, id_coordenador]
    );
    return result.rows[0];
  }

  async update(id, { nome, sigla, descricao, id_coordenador }) {
    const result = await db.query(
      `UPDATE curso
       SET nome=$1, sigla=$2, descricao=$3, id_coordenador=$4
       WHERE id=$5
       RETURNING *`,
      [nome, sigla, descricao, id_coordenador, id]
    );
    return result.rows[0];
  }

  async delete(id) {
    const result = await db.query(
      'DELETE FROM curso WHERE id=$1 RETURNING *',
      [id]
    );
    return result.rows[0] || { message: "Curso removido com sucesso", id };
  }
}

module.exports = new Curso();