import { formatToCamelCase } from './formatToCamelCase';

describe('formatToCamelCase function', () => {
  it('converts basic phrase to CamelCase', () => {
    const result = formatToCamelCase('hello world');
    expect(result).toBe('helloWorld');
  });

  it('returns empty string for empty input', () => {
    const result = formatToCamelCase('');
    expect(result).toBe('');
  });

  it('handles single word input', () => {
    const result = formatToCamelCase('camel');
    expect(result).toBe('camel');
  });

  it('converts all uppercase input to CamelCase', () => {
    const result = formatToCamelCase('HELLO THERE');
    expect(result).toBe('helloThere');
  });

  it('converts mixed case input to CamelCase', () => {
    const result = formatToCamelCase('hElLo WoRlD');
    expect(result).toBe('helloWorld');
  });

  it('handles longer phrase with spaces', () => {
    const result = formatToCamelCase('the quick brown fox jumps');
    expect(result).toBe('theQuickBrownFoxJumps');
  });
});
