const contactRepository = require('../repositories/contactRepository');

class ContactController {
    async create(req, res) {
        try {
            const { nome, telefone } = req.body;
            if (!nome || !telefone) {
                return res.status(400).json({ error: 'Nome e telefone são obrigatórios.' });
            }

            const newContact = await contactRepository.create(nome, telefone);
            return res.status(201).json(newContact);
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    }

    async getAll(req, res) {
        try {
            const contacts = await contactRepository.findAll();
            return res.status(200).json(contacts);
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { nome, telefone } = req.body;

            const existingContact = await contactRepository.findById(id);
            if (!existingContact) {
                return res.status(404).json({ error: 'Contato não encontrado.' });
            }

            const fieldsToUpdate = {};
            if (nome) fieldsToUpdate.nome = nome;
            if (telefone) fieldsToUpdate.telefone = telefone;

            const updatedContact = await contactRepository.update(id, fieldsToUpdate);
            return res.status(200).json(updatedContact);
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;

            const existingContact = await contactRepository.findById(id);
            if (!existingContact) {
                return res.status(404).json({ error: 'Contato não encontrado.' });
            }

            await contactRepository.delete(id);
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    }
}

module.exports = new ContactController();