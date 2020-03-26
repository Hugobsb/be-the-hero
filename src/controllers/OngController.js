const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    index(req, res) {
        connection('ongs').select('*').then((data) => {
            const ongs = data;
            return res.json(ongs) || res.json('No ONGs were found');
        });
    },
    create(req, res) {
        const { name, email, whatsapp, city, uf } = req.body;

        const id = crypto.randomBytes(4).toString('HEX');

        console.log('proccessing...');

        connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        }).then((data) => {
            return res.json({ id });
        });
    }
};