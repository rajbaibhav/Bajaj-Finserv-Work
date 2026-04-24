const mongoose = require('mongoose');

const ProcessLogSchema = new mongoose.Schema({
    inputData: { 
        type: [String], 
        required: true 
    },
    responseData: { 
        type: mongoose.Schema.Types.Mixed, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('ProcessLog', ProcessLogSchema);
