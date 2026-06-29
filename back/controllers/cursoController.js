const Curso = require('../models/Curso');

exports.getCursos = async (req, res) => {
  const cursos = await Curso.getAll();
  res.json(cursos);
};

exports.getCurso = async (req, res) => {
  const curso = await Curso.getById(req.params.id);
  res.json(curso);
};

exports.createCurso = async (req, res) => {
  const curso = await Curso.insert(req.body);
  res.status(201).json(curso);
};

exports.updateCurso = async (req, res) => {
  const curso = await Curso.update(req.params.id, req.body);
  res.json(curso);
};

exports.deleteCurso = async (req, res) => {
  const curso = await Curso.delete(req.params.id);
  res.json(curso);
};
