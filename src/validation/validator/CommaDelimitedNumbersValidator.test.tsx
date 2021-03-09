import { ValidatorResponse } from '../ValidatorResponse';
import { CommaDelimitedNumbersValidator } from './CommaDelimitedNumbersValidator';

var validator = new CommaDelimitedNumbersValidator(",", null);

beforeEach(() => {
    validator = new CommaDelimitedNumbersValidator(",", null);
})

test('A non-number string', () => {
    const providedValue = "5a";

    const result = validator.execute(providedValue);

    expect(result).toBe(ValidatorResponse.INVALID_FORMAT);
});

test('Numbers not comma delimited', () => {
    const providedValue = "5 5 4";

    const result = validator.execute(providedValue);

    expect(result).toBe(ValidatorResponse.INVALID_FORMAT);
});

test('A single number string', () => {
    const providedValue = "5";
    const expectedResult = [5];

    const result = validator.execute(providedValue);

    expect(result).toBe(ValidatorResponse.SUCCESS);
    expect(validator.result).toEqual(expectedResult)
});

test('Three comma-space delimited numbers in a string', () => {
    const providedValue = "5, 10, 2";
    const expectedResult = [5, 10, 2];

    const result = validator.execute(providedValue);

    expect(result).toBe(ValidatorResponse.SUCCESS);
    expect(validator.result).toEqual(expectedResult)
});

test('Three comma delimited numbers in a string', () => {
    const providedValue = "5,10,2";
    const expectedResult = [5, 10, 2];

    const result = validator.execute(providedValue);

    expect(result).toBe(ValidatorResponse.SUCCESS);
    expect(validator.result).toEqual(expectedResult)
});

test('Three comma delimited numbers in a string with a trailing comma', () => {
    const providedValue = "5,10,2,";

    const result = validator.execute(providedValue);

    expect(result).toBe(ValidatorResponse.INVALID_FORMAT);
});

test('Only commas in a string', () => {
    const providedValue = ",,,,";

    const result = validator.execute(providedValue);

    expect(result).toBe(ValidatorResponse.INVALID_FORMAT);
});