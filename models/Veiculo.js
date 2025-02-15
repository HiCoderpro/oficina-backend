const mongoose = require('mongoose');

const VeiculoSchema = new mongoose.Schema({
    placa: { type: String, required: true, unique: true },
    ano: { type: Number, required: true },
    cor: { type: String, required: true },
    kilometragem: { type: Number, required: true }
});

module.exports = mongoose.model('Veiculo', VeiculoSchema);
