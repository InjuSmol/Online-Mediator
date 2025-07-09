jest.mock('../src/lib/cloudinary.js', () => ({
  default: {
    config: jest.fn(),
  },
}));