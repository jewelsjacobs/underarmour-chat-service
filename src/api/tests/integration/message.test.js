/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-expressions */
const request = require('supertest');
const httpStatus = require('http-status');
const { expect } = require('chai');
const moment = require('moment');
const { some, omitBy, isNil } = require('lodash');
const app = require('../../../index');
const Message = require('../../models/message.model');

/**
 * root level hooks
 */

async function format(message) {
  // get messages from database
  const dbUser = (await Message.findOne({ username: message.username })).transform();

  // remove null and undefined properties
  return omitBy(dbUser, isNil);
}

describe('Message API', () => {
  let dbMessages;
  let message;

  beforeEach(async () => {
    dbMessages = {
      messageOne: {
        username: 'jewlejsjacobs',
        text: 'Hey there pall',
        timeout: '3',
        createdAt: moment(),
        updatedAt: moment(),
      },
      messageTwo: {
        username: 'jewlejsjacobs',
        text: 'Hello',
        timeout: '20',
        createdAt: moment(),
        updatedAt: moment(),
      },
      messageThree: {
        username: 'jewlejsjacobs',
        text: 'Hi',
        timeout: '20',
        createdAt: moment(),
        updatedAt: moment(),
      },
      messageFour: {
        username: 'dannyboy',
        text: 'The pipes, the pipes are calling',
        timeout: '4',
        createdAt: moment(),
        updatedAt: moment(),
      },
    };

    message = {
      username: 'jewlejsjacobs',
      text: 'Hey there pall',
      timeout: '3',
    };

    await Message.remove({});
    await Message.insertMany([
      dbMessages.messageOne,
      dbMessages.messageTwo,
      dbMessages.messageThree,
      dbMessages.messageFour,
    ]);
  });

  describe('POST /v1/messages', () => {
    it('should create a new message when request is ok', () => {
      return request(app)
        .post('/v1/messages')
        .send(message)
        .expect(httpStatus.CREATED)
        .then((res) => {
          expect(res.body).to.include(message);
        });
    });
  });

  describe('GET /v1/messages/username/:username', () => {

    it('should filter messages based on timeout and user', () => {
      return request(app)
        .get('/v1/messages/username/jewlejsjacobs/')
        .expect(httpStatus.OK)
        .then((res) => {
          const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

          const jewlejsjacobs = format(dbMessages.messageOne);
          const includesJewlejsjacobs = some(res.body, jewlejsjacobs);

          async () => {
            await wait(jewlejsjacobs.timeout * 1000);
            await this._assert();
          };

          this._assert = () => {
            expect(res.body).to.have.lengthOf(1);
            expect(includesJewlejsjacobs).to.be.false;
          };
        });
    });
  });
});
