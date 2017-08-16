const Joi = require('joi');

module.exports = {
  // GET /v1/messages/username/:username
  listMessage: {
    params: {
      username: Joi.string().required(),
    },
  },
  // POST /v1/messages
  createMessage: {
    body: {
      username: Joi.string().required(),
      text: Joi.string().required(),
      timeout: Joi.string().regex(/^[1-9][0-9]*$/).required(),
    },
  },
};
