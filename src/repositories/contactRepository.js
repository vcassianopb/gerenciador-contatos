const pool = require('../config/database');

class ContactRepository {
    async create(nome, telefone) {
        const [result] = await pool.query(
            'INSERT INTO contatos (nome, telefone) VALUES (?, ?)',
            [nome, telefone]
        );
        return this.findById(result.insertId);
    }

    async findAll() {
        const [rows] = await pool.query('SELECT id, nome, telefone FROM contatos');
        return rows;
    }

    async findById(id) {
        const [rows] = await pool.query('SELECT id, nome, telefone FROM contatos WHERE id = ?', [id]);
        return rows[0] || null;
    }

    async update(id, fieldsToUpdate) {
        const keys = Object.keys(fieldsToUpdate);
        if (keys.length === 0) return null;

        const setClause = keys.map(key => `${key} = ?`).join(', ');
        const values = [...Object.values(fieldsToUpdate), id];

        await pool.query(`UPDATE contatos SET ${setClause} WHERE id = ?`, values);
        return this.findById(id);
    }

    async delete(id) {
        const [result] = await pool.query('DELETE FROM contatos WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}

module.exports = new ContactRepository();