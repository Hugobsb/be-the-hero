const connection = require('../database/connection');

module.exports = {
    create (req, res) {
        const { id } = req.body;
        connection('ongs').where('id', id).select('name').first().then((ong) => {
            if (!ong) return res.status(400).json({error: 'No ONGs were found with this id'});
            else res.json(ong);
        });
    }
};