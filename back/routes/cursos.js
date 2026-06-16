const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const cursosFile = path.join(__dirname, '..', 'public', 'cursos.json');

function loadCursos() {
    const data = fs.readFileSync(cursosFile, 'utf8');
    return JSON.parse(data);
}

router.get('/', (req, res) => {
    const cursos = loadCursos();
    res.json(cursos);
});

router.post('/', (req, res) => {
    const novoCurso = req.body;
    novoCurso.codigo = Number(novoCurso.codigo) || Date.now();

    console.log('POST /cursos', novoCurso);
    res.json({
        status: 'ok',
        method: 'POST',
        body: novoCurso
    });
});

router.put('/:codigo', (req, res) => {
    const codigo = Number(req.params.codigo);
    const atualizado = req.body;

    console.log('PUT /cursos/:codigo', { codigo, body: atualizado });
    res.json({
        status: 'ok',
        method: 'PUT',
        codigo,
        body: atualizado
    });
});

router.delete('/:codigo', (req, res) => {
    const codigo = Number(req.params.codigo);

    console.log('DELETE /cursos/:codigo', { codigo });
    res.json({
        status: 'ok',
        method: 'DELETE',
        codigo
    });
});

module.exports = router;