const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/message.controller');
const {
  listMessage,
  createMessage,
} = require('../../validations/message.validation');

const router = express.Router();

/**
 * Load messages when API with username route parameter is hit
 */
router.param('username', controller.load);

router
  .route('/')
  /**
   * @api {post} v1/messages Create Message
   * @apiDescription Create a new message
   * @apiVersion 1.0.0
   * @apiName CreateMessages
   * @apiGroup Message
   *
   *
   * @apiParam  {String}                 username       The recipient of the message
   * @apiParam  {String}                 text           The content of the message
   * @apiParam  {String}                 timeout        The number of seconds the message should
   * live before expiring
   *
   * @apiSuccess (Created 201) {String}  username         The recipient of the message
   * @apiSuccess (Created 201) {String}  text             The content of the message
   * @apiSuccess (Created 201) {String}  timeout          The number of seconds the message should
   * live before expiring
   *
   * @apiError (Bad Request 400)   ValidationError        Some parameters may contain invalid values
   */
  .post(validate(createMessage), controller.create);

router
  .route('/username/:username')
  /**
   * @api {get} v1/messages/username/:username List Messages
   * @apiDescription Get a list of messages
   * @apiVersion 1.0.0
   * @apiName ListMessages
   * @apiGroup Message
   *
   * @apiParam  {String}                 username       The recipient of the message
   *
   * @apiSuccess {Object[]} messages List of messages.
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Bad Request 404)   APIError         User does not exist
   */
  .get(validate(listMessage), controller.list);

module.exports = router;
