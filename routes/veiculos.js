const express = require('express');
const router = express.Router();
const Veiculo = require('../models/Veiculo');

// Rota para cadastrar veículo
router.post('/', async (req, res) => {
    try {
        const novoVeiculo = new Veiculo(req.body);
        await novoVeiculo.save();
        res.status(201).json(novoVeiculo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rota para pesquisar veículo por placa
router.get('/:placa', async (req, res) => {
    try {
        const veiculo = await Veiculo.findOne({ placa: req.params.placa.toUpperCase() });
        if (!veiculo) {
            return res.status(404).json({ message: 'Veículo não encontrado' });
        }
        res.json(veiculo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para atualizar um veículo
router.put('/:placa', async (req, res) => {
    try {
        const veiculoAtualizado = await Veiculo.findOneAndUpdate(
            { placa: req.params.placa.toUpperCase() },
            req.body,
            { new: true }
        );
        if (!veiculoAtualizado) {
            return res.status(404).json({ message: 'Veículo não encontrado' });
        }
        res.json(veiculoAtualizado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rota para remover um veículo
router.delete('/:placa', async (req, res) => {
    try {
        const veiculoRemovido = await Veiculo.findOneAndDelete({ placa: req.params.placa.toUpperCase() });
        if (!veiculoRemovido) {
            return res.status(404).json({ message: 'Veículo não encontrado' });
        }
        res.json({ message: 'Veículo removido com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
