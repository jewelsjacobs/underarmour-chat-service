const mongoose = require('mongoose');
const moment = require('moment');
const APIError = require('../utils/APIError');
const httpStatus = require('http-status');

/**
 * Message Schema
 * @private
 */
const messageSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  timeout: {
    type: String,
  },
}, {
  timestamps: true,
});

/**
 * Methods
 */
messageSchema.method({

  /**
   * Takes parameters from the request body and transforms into object
   * @returns {{}}
   */
  transform() {
    const transformed = {};
    const fields = ['username', 'text', 'timeout'];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },

});

/**
 * Statics
 * @see {@url http://mongoosejs.com/docs/guide.html#statics}
 */
messageSchema.statics = {

  /**
   * Get username
   *
   * @param {String} username - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  async get(username) {
    try {
      const messages = await this.findOne({ username }).exec();

      if (messages) {
        return messages;
      }

      throw new APIError({
        message: 'User does not exist',
        status: httpStatus.NOT_FOUND,
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * List messages in descending order of 'createdAt' timestamp
   * and performs filter based on timeout value and username.
   *
   * @param {String} username - The recipient of the message.
   * @param {number} timeout - The number of seconds the message should live before expiring.
   * @returns {Promise<Message[]>}
   */
  list({ username }) {
    return this.find({ username, $where: 'this.createdAt > new Date(ISODate().getTime() - parseInt(this.timeout, 10) * 1000)' });
  },

};

/**
 * @typedef Message
 */
module.exports = mongoose.model('Message', messageSchema);
