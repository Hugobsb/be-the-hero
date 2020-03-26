const connection = require('../database/connection');

module.exports = {
    index(req, res) {
        const { page = 1 } = req.query;

        connection('incidents').join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5).offset((page-1)*5).select([
            'incidents.*',
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city',
            'ongs.uf'
        ]).then((data) => {
            if (data.length !== 0) {
                connection('incidents').count().then((i) => {
                    res.header('X-Total-Count', i[0]['count(*)']);
                    return res.json(data);
                });
            }
            else return res.status(404).json({error: "No incidents were found"});
        });
    },

    create(req, res) {
        const { title, description, value } = req.body;
        const ong_id = req.headers.authorization;

        connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        }).then((data) => {
            return res.json({id: data[0]});
        });
    },

    delete(req, res) {
        const { id } = req.params;
        const ong_id = req.headers.authorization;

        connection('incidents').where('id', id).select('ong_id').first().then((query_id) => {
            if (typeof query_id === "undefined") return res.status(404).json({error: 'No incidents found'});
            else if (query_id.ong_id !== ong_id) return res.status(401).json({error: 'Operation not permited'});
            
            (connection('incidents').where('id', id).delete()).then((_) => {
                return res.status(204).send();
            });
        });
    }
}