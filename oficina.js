const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost:27017/oficina', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Definir o modelo do veículo
const VeiculoSchema = new mongoose.Schema({
    placa: { type: String, required: true, unique: true },
    ano: { type: Number, required: true },
    cor: { type: String, required: true },
    kilometragem: { type: Number, required: true }
});

const Veiculo = mongoose.model('Veiculo', VeiculoSchema);

// Rota para cadastrar veículo
app.post('/veiculos', async (req, res) => {
    try {
        const novoVeiculo = new Veiculo(req.body);
        await novoVeiculo.save();
        res.status(201).json(novoVeiculo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rota para pesquisar veículo por placa
app.get('/veiculos/:placa', async (req, res) => {
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

// Rota para atualizar um veículo por placa
app.put('/veiculos/:placa', async (req, res) => {
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

// Rota para remover um veículo por placa
app.delete('/veiculos/:placa', async (req, res) => {
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

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
