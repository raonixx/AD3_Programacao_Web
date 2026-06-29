const Professor = require('../models/Professor');

exports.getProfessores = async (req, res) => {

    const professores = await Professor.getAll();

    res.json(professores);

};

exports.getProfessor = async (req, res) => {

    const professor = await Professor.getById(req.params.id);

    res.json(professor);

};

exports.insereProfessor = async (req, res) => {

    const professor = await Professor.insert(req.body);

    res.status(201).json(professor);

};

exports.updateProfessor = async (req, res) => {

    const professor = await Professor.update(
        req.params.id,
        req.body
    );

    res.json(professor);

};

exports.deleteProfessor = async (req, res) => {

    const resposta = await Professor.delete(req.params.id);

    res.json(resposta);

};