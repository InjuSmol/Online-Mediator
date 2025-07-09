// __tests__/auth.controller.unit.test.js
import bcrypt from 'bcryptjs';
import { signup, login } from '../src/controllers/auth.controller.js';
import User from '../src/models/user.model.js';
import * as utils from '../src/lib/utils.js';

jest.mock('../src/models/user.model.js');
jest.mock('../src/lib/utils.js');

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res); // chaining
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Auth Controller - Unit', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('signup should create a new user and return 201', async () => {
    const req = {
      body: {
        fullName: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      },
    };
    const res = mockResponse();

    User.findOne.mockResolvedValue(null);
    utils.generateToken.mockReturnValue('fake-token');

    const mockSave = jest.fn().mockResolvedValue(true);
    User.mockImplementation(() => ({
      _id: 'mockUserId',
      fullName: req.body.fullName,
      email: req.body.email,
      profilePic: '',
      save: mockSave,
    }));

    await signup(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(mockSave).toHaveBeenCalled();
    expect(utils.generateToken).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ email: 'test@example.com' })
    );
  });

  test('login should return 200 and user data on success', async () => {
    const req = {
      body: {
        email: 'test@example.com',
        password: 'password123',
      },
    };
    const res = mockResponse();

    const hashed = await bcrypt.hash('password123', 10);

    User.findOne.mockResolvedValue({
      _id: 'mockUserId',
      fullName: 'Test User',
      email: 'test@example.com',
      password: hashed,
      profilePic: '',
    });

    utils.generateToken.mockReturnValue('fake-token');

    await login(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(utils.generateToken).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ email: 'test@example.com' })
    );
  });

  test('login should return 400 for invalid password', async () => {
    const req = {
      body: {
        email: 'test@example.com',
        password: 'wrongpassword',
      },
    };
    const res = mockResponse();

    const hashed = await bcrypt.hash('password123', 10);
    User.findOne.mockResolvedValue({
      password: hashed,
    });

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
  });
});
