import { ValidatorResponse } from '../ValidatorResponse';
import { ArraySizeValidator } from './ArraySizeValidator';

test('array of size 3 given to a 3 limit validator', () => {
    const arrayValidator = new ArraySizeValidator(null, 3)
    const providedValue = [3, "a", -2];

    const result = arrayValidator.execute(providedValue);

    expect(result).toBe(ValidatorResponse.SUCCESS);
    expect(arrayValidator.result).toBe(providedValue)
});

test('array of size 4 given to a 3 limit validator', () => {
    const arrayValidator = new ArraySizeValidator(null, 3)
    const providedValue = [3, "a", -2, "a"];

    const result = arrayValidator.execute(providedValue);

    expect(result).toBe(ValidatorResponse.INVALID_LENGTH);
});

test('array of size 1 given to a 2 limit validator', () => {
    const arrayValidator = new ArraySizeValidator(null, 2)
    const providedValue = [{}];

    const result = arrayValidator.execute(providedValue);

    expect(result).toBe(ValidatorResponse.SUCCESS);
    expect(arrayValidator.result).toBe(providedValue)
});

test('array of size 1 given to a -2 limit validator', () => {
    const arrayValidator = new ArraySizeValidator(null, -2)
    const providedValue = [{}];

    const result = arrayValidator.execute(providedValue);

    expect(result).toBe(ValidatorResponse.INVALID_LENGTH);
});