import { toTitleCase } from './toTitleCase';

describe('toTitleCase function', () => {
  it('capitalizes the first letter and converts the rest to lowercase', () => {
    const result = toTitleCase('hello world');
    expect(result).toEqual('Hello world');
  });

  it('does not change already title-cased strings', () => {
    const result = toTitleCase('Hello World');
    expect(result).toEqual('Hello world');
  });

  it('converts all-uppercase strings to title case', () => {
    const result = toTitleCase('THIS IS AN EXAMPLE');
    expect(result).toEqual('This is an example');
  });

  it('handles empty strings gracefully', () => {
    const result = toTitleCase('');
    expect(result).toEqual('');
  });

  it('capitalizes the first letter and converts the rest to lowercase (including special characters)', () => {
    const result = toTitleCase('$special CHARactERS');
    expect(result).toEqual('$special characters');
  });

  it('does not change non-alphabetic characters except for the first letter', () => {
    const result = toTitleCase('123 numbers');
    expect(result).toEqual('123 numbers');
  });
});
