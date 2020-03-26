const connection = require('../database/connection');

module.exports = {
    index(req, res) {
        const ong_id = req.headers.authorization;
        connection('incidents').where('ong_id', ong_id).select('*').then((data) => {
            if (data.length !== 0) res.json(data);
            else res.status(404).json({error: 'No incidents were found'});
        });
    }
};