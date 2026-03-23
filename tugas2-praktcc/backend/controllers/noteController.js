const db = require('../config/db');

exports.getAllNotes = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM notes ORDER BY tanggal_dibuat DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createNote = async (req, res) => {
    const { judul, isi } = req.body;
    try {
        await db.query('INSERT INTO notes (judul, isi) VALUES (?, ?)', [judul, isi]);
        res.status(201).json({ message: "Catatan tersimpan!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateNote = async (req, res) => {
    const { id } = req.params;
    const { judul, isi } = req.body;
    try {
        await db.query('UPDATE notes SET judul = ?, isi = ? WHERE id = ?', [judul, isi, id]);
        res.json({ message: "Catatan diperbarui!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteNote = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM notes WHERE id = ?', [id]);
        res.json({ message: "Catatan berhasil dibuang!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};