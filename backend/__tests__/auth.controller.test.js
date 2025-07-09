// __tests__/auth.controller.test.js
import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//mport * as cloudinaryLib from '../src/lib/cloudinary.js';
import * as utils from '../src/lib/utils.js';
import User from '../src/models/user.model.js';
import {
  signup,
  login,
  logout,
  updateProfile,
  checkAuth
} from '../src/controllers/auth.controller.js';

jest.mock('../src/models/user.model.js');
//jest.mock('../src/lib/cloudinary.js');
jest.mock('../src/lib/utils.js');

const app = express();
app.use(express.json());
app.use(cookieParser());

app.post('/api/auth/signup', signup);
app.post('/api/auth/login', login);
app.post('/api/auth/logout', logout);
app.put('/api/auth/profile', (req, res, next) => {
  req.user = { _id: 'mockUserId' }; // mock auth middleware
  next();
}, updateProfile);
app.get('/api/auth/check', (req, res, next) => {
  req.user = { _id: 'mockUserId', email: 'user@test.com' }; // mock user
  next();
}, checkAuth);

describe('Auth Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('signup should create a new user', async () => {
    User.findOne.mockResolvedValue(null);
    User.prototype.save = jest.fn().mockResolvedValue(true);
    User.mockImplementation(() => ({
    _id: 'mockUserId',
    fullName: 'Test User',
    email: 'test@example.com',
    profilePic: '',
    save: jest.fn().mockResolvedValue(true),
    }));
    utils.generateToken.mockImplementation(() => 'fake-token');

    const res = await request(app).post('/api/auth/signup').send({
      fullName: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.email).toBe('test@example.com');
  });

  test('login should succeed with valid credentials', async () => {
    const hashed = await bcrypt.hash('password123', 10);
    User.findOne.mockResolvedValue({
      _id: 'mockUserId',
      fullName: 'Test User',
      email: 'test@example.com',
      password: hashed,
      profilePic: ''
    });
    utils.generateToken.mockImplementation(() => 'fake-token');

    const res = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'password123'
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe('test@example.com');
  });

  test('logout should clear the jwt cookie', async () => {
    const res = await request(app).post('/api/auth/logout');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Logged out successfully');
  });

  /*test('updateProfile should upload image and update user', async () => {
    cloudinaryLib.default.uploader = {
      upload: jest.fn().mockResolvedValue({ secure_url: 'https://image.url/profile.jpg' })
    };
    User.findByIdAndUpdate.mockResolvedValue({ profilePic: 'https://image.url/profile.jpg' });

    const res = await request(app).put('/api/auth/profile').send({
      profilePic: 'data:image/jpeg;base64,somebase64data'
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.profilePic).toBe('https://image.url/profile.jpg');
  });
  */

  test('checkAuth should return the user', async () => {
    const res = await request(app).get('/api/auth/check');
    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe('user@test.com');
  });
});

