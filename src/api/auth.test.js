import axios from 'axios';
import { login } from './auth';
import { setSessionData, removeSessionData } from '../common/helpers/sessionHandlers';

// Mock Axios post method
jest.mock('axios');

// Mock sessionStorage
const sessionStorageMock = (() => {
  let store = {};
  return {
    getItem: function(key) {
      return store[key] || null;
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    removeItem: function(key) {
      delete store[key];
    },
    clear: function() {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock
});

describe('login', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('logs in successfully', async () => {
    const mockResponse = {
      data: {
        accessToken: 'mock_access_token',
        user: {
          id: 'user_id_123',
          name: 'John Doe',
          email: 'john.doe@example.com',
        },
      },
    };

    // Mock Axios post method to resolve with mockResponse
    axios.post.mockResolvedValue(mockResponse);

    // Call login function
    const result = await login('john.doe@example.com', 'password123');

    expect(axios.post).toHaveBeenCalledWith('https://localhost:3500/auth/login', {
      email: 'john.doe@example.com',
      password: 'password123',
    });
    expect(sessionStorage.getItem('loginResponse')).toEqual(JSON.stringify(mockResponse.data));
    expect(result).toEqual(mockResponse.data);
  });

  it('handles login failure', async () => {
    axios.post.mockRejectedValue(new Error('Unauthorized'));

    await expect(login('john.doe@example.com', 'password123')).rejects.toThrowError('Login failed!');


    expect(axios.post).toHaveBeenCalledWith('https://localhost:3500/auth/login', {
      email: 'john.doe@example.com',
      password: 'password123',
    });
    expect(sessionStorage.getItem('loginResponse')).toBeNull();
  });
});
