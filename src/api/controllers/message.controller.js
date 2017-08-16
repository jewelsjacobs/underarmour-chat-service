const httpStatus = require('http-status');
const Message = require('../models/message.model');
const { handler: errorHandler } = require('../middlewares/error');

/**
 * Load username and append to req.
 * @public
 */
exports.load = async (req, res, next, username) => {
  try {
    const message = await Message.get(username);
    req.locals = { message };
    return next();
  } catch (error) {
    return next(errorHandler(error, req, res));
  }
};

/**
 * Create new message
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const message = new Message(req.body);
    const savedMessage = await message.save();
    res.status(httpStatus.CREATED);
    res.json(savedMessage.transform());
  } catch (error) {
    next(errorHandler(error, req, res));
  }
};

/**
 * Get message list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const messages = await Message.list(req.params);
    const transformedMessages = messages.map(message => message.transform());
    res.json(transformedMessages);
  } catch (error) {
    next(errorHandler(error, req, res));
  }
};
