const { Router } = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');
const routes = Router();

routes.get('/ongs', OngController.index);

routes.get('/incidents', IncidentController.index);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), ProfileController.index);

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        whatsapp: Joi.string().min(10).max(13).required(),
        city: Joi.string().required(),
        uf: Joi.string().length(2).required()
    })
}), OngController.create);

routes.post('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number().min(1)
    })
}), IncidentController.create);

routes.post('/sessions', SessionController.create);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), IncidentController.delete);

module.exports = routes;