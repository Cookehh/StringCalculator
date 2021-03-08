import { NullValidator } from './NullValidator';
import { ValidatorResponse } from '../ValidatorResponse';

var nullValidator = new NullValidator(null);

beforeEach(() => {
    nullValidator = new NullValidator(null);
})

test('Null given to null validator', () => {
    const providedValue = null;

    const result = nullValidator.add(providedValue);

    expect(result).toBe(ValidatorResponse.NULL);
});

test('An empty string given to the null validator', () => {
    const providedValue = "";

    const result = nullValidator.add(providedValue);

    expect(result).toBe(ValidatorResponse.SUCCESS);
    expect(nullValidator.result).toEqual(providedValue);
});

test('An populated string given to the null validator', () => {
    const providedValue = "Populated";

    const result = nullValidator.add(providedValue);

    expect(result).toBe(ValidatorResponse.SUCCESS);
    expect(nullValidator.result).toEqual(providedValue);
});