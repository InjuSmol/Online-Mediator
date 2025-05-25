const request = require('supertest');
const app = require('../index.js'); // express app
const User = require('../models/user.model.js');
const Message = require('../models/message.model.js');

describe('Chat Flow', () => {
  let user1Cookie;
  let user2Cookie;
  let user1Id;
  let user2Id;

  beforeAll(async () => {
    // Register user1
    const res1 = await request(app).post('/api/auth/signup').send({
      fullName: 'User One',
      email: 'user1@example.com',
      password: 'pass1234',
    });
    user1Id = res1.body._id;
    user1Cookie = res1.headers['set-cookie'];

    // Register user2
    const res2 = await request(app).post('/api/auth/signup').send({
      fullName: 'User Two',
      email: 'user2@example.com',
      password: 'pass1234',
    });
    user2Id = res2.body._id;
    user2Cookie = res2.headers['set-cookie'];
  });

  it('should allow user1 to send a message to user2 and retrieve it', async () => {
    // User1 sends message to User2
    await request(app)
      .post(`/api/messages/send/${user2Id}`)
      .set('Cookie', user1Cookie)
      .send({ text: 'Hello user2!' })
      .expect(201);

    // User1 fetches message history with user2
    const res = await request(app)
      .get(`/api/messages/${user2Id}`)
      .set('Cookie', user1Cookie)
      .expect(200);

    expect(res.body).toHaveLength(1);
    expect(res.body[0].text).toBe('Hello user2!');
    expect(res.body[0].senderId).toBe(user1Id);
    expect(res.body[0].receiverId).toBe(user2Id);
  });

  afterAll(async () => {
    // Clean up users and messages
    await User.deleteMany({ email: { $in: ['user1@example.com', 'user2@example.com'] } });
    await Message.deleteMany({});
  });
});
