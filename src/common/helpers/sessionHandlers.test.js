import {
    setSessionData,
    getSessionData,
    removeSessionData,
    clearSessionData
  } from './sessionHandlers';
  
  describe('Session Storage Helper Functions', () => {
    // Clear sessionStorage before each test
    beforeEach(() => {
      sessionStorage.clear();
    });
  
    test('setSessionData stores data in sessionStorage', () => {
      const key = 'testKey';
      const value = { name: 'John Doe', age: 30 };
  
      setSessionData(key, value);
  
      // Retrieve from sessionStorage and assert
      const storedValue = JSON.parse(sessionStorage.getItem(key));
      expect(storedValue).toEqual(value);
    });
  
    test('getSessionData retrieves data from sessionStorage', () => {
      const key = 'testKey';
      const value = { name: 'Jane Smith', age: 25 };
  
      // Set initial data
      sessionStorage.setItem(key, JSON.stringify(value));
  
      // Retrieve using getSessionData and assert
      const retrievedValue = getSessionData(key);
      expect(retrievedValue).toEqual(value);
    });
  
    test('getSessionData returns null for non-existent key', () => {
      const key = 'nonExistentKey';
  
      // Retrieve using getSessionData and assert
      const retrievedValue = getSessionData(key);
      expect(retrievedValue).toBeNull();
    });
  
    test('removeSessionData removes data from sessionStorage', () => {
      const key = 'testKey';
      const value = { email: 'john.doe@example.com', isAdmin: true };
  
      // Set initial data
      sessionStorage.setItem(key, JSON.stringify(value));
  
      // Remove using removeSessionData
      removeSessionData(key);
  
      // Assert data is removed
      const storedValue = sessionStorage.getItem(key);
      expect(storedValue).toBeNull();
    });
  
    test('clearSessionData clears all data from sessionStorage', () => {
      const key1 = 'key1';
      const key2 = 'key2';
      const value1 = { value: 'data1' };
      const value2 = { value: 'data2' };
  
      // Set initial data
      sessionStorage.setItem(key1, JSON.stringify(value1));
      sessionStorage.setItem(key2, JSON.stringify(value2));
  
      // Clear sessionStorage using clearSessionData
      clearSessionData();
  
      // Assert sessionStorage is empty
      expect(sessionStorage.getItem(key1)).toBeNull();
      expect(sessionStorage.getItem(key2)).toBeNull();
    });
  });
  