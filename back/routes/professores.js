const express = require('express');
const router = express.Router();

const professores = require('../public/professores.json');

router.get('/', (req, res) => {
    res.json(professores);
});

router.post('/', (req, res) => {
    console.log('POST /professores', req.body);
    res.json({
        status: 'ok',
        method: 'POST',
        body: req.body
    });
});

router.put('/:codigo', (req, res) => {
    console.log('PUT /professores/:codigo', {
        codigo: req.params.codigo,
        body: req.body
    });
    res.json({
        status: 'ok',
        method: 'PUT',
        codigo: req.params.codigo,
        body: req.body
    });
});

router.delete('/:codigo', (req, res) => {
    console.log('DELETE /professores/:codigo', {
        codigo: req.params.codigo
    });
    res.json({
        status: 'ok',
        method: 'DELETE',
        codigo: req.params.codigo
    });
});

module.exports = router;