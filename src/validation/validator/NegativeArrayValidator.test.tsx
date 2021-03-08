import { ValidatorResponse } from '../ValidatorResponse';
import { NegativeArrayValidator } from './NegativeArrayValidator';

var validator = new NegativeArrayValidator(null);

beforeEach(() => {
    validator = new NegativeArrayValidator(null);
});

test('An empty array', () => {
    const providedValue: Array<number> = [];

    const result = validator.validate(providedValue);

    expect(result).toBe(ValidatorResponse.SUCCESS);
    expect(validator.result).toBe(providedValue)
});

test('An array with one positive number', () => {
    const providedValue: Array<number> = [2];

    const result = validator.validate(providedValue);

    expect(result).toBe(ValidatorResponse.SUCCESS);
    expect(validator.result).toBe(providedValue)
});

test('An array with many positive numbers', () => {
    const providedValue: Array<number> = [2, 10, 500];

    const result = validator.validate(providedValue);

    expect(result).toBe(ValidatorResponse.SUCCESS);
    expect(validator.result).toBe(providedValue)
});

test('An array with the value 0', () => {
    const providedValue: Array<number> = [0];

    const result = validator.validate(providedValue);

    expect(result).toBe(ValidatorResponse.SUCCESS);
    expect(validator.result).toBe(providedValue)
});

test('An array with a single negative value', () => {
    const providedValue: Array<number> = [-1];

    const result = validator.validate(providedValue);

    expect(result).toBe(ValidatorResponse.NEGATIVE);
});

test('An array with a many negative values', () => {
    const providedValue: Array<number> = [-1, -20, -30];

    const result = validator.validate(providedValue);

    expect(result).toBe(ValidatorResponse.NEGATIVE);
});

test('An array with a mix of positive and negative values', () => {
    const providedValue: Array<number> = [-1, 3, -20, -30, 1];

    const result = validator.validate(providedValue);

    expect(result).toBe(ValidatorResponse.NEGATIVE);
});