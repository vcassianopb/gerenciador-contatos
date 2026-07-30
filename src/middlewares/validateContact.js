function isValidName(nome) {
    if (!nome || typeof nome !== 'string') return false;

    const words = nome.trim().split(/\s+/);
    if (words.length < 2) return false;

    return words.every(word => word.length >= 3);
}

function validateContactPayload(req, res, next) {
    const { nome, telefone } = req.body;

    if (req.method === 'PATCH' && !nome && !telefone) {
        return res.status(400).json({ error: 'Nenhum campo fornecido para atualização.' });
    }

    if (nome && !isValidName(nome)) {
        return res.status(400).json({
            error: 'O nome deve conter pelo menos duas palavras, cada uma com no mínimo 3 letras.'
        });
    }

    next();
}

module.exports = { validateContactPayload };