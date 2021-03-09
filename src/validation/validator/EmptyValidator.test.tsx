import { ValidatorResponse } from '../ValidatorResponse';
import { EmptyValidator } from './EmptyValidator';

var emptyValidator = new EmptyValidator(null);

beforeEach(() => {
    emptyValidator = new EmptyValidator(null);
})

test('An empty string given to the validator', () => {
    const providedValue = "";

    const result = emptyValidator.execute(providedValue);

    expect(result).toBe(ValidatorResponse.EMPTY);
});

test('A string with spaces given to the validator', () => {
    const providedValue = "  ";

    const result = emptyValidator.execute(providedValue);

    expect(result).toBe(ValidatorResponse.EMPTY);
});

test('A string with tabs given to the validator', () => {
    const providedValue = "\t";

    const result = emptyValidator.execute(providedValue);

    expect(result).toBe(ValidatorResponse.EMPTY);
});

test('A string with new lines given to the validator', () => {
    const providedValue = "\n";

    const result = emptyValidator.execute(providedValue);

    expect(result).toBe(ValidatorResponse.EMPTY);
});

test('A populated string given to the validator', () => {
    const providedValue = "Populated";

    const result = emptyValidator.execute(providedValue);

    expect(result).toBe(ValidatorResponse.SUCCESS);
    expect(emptyValidator.result).toEqual(providedValue)
});

test('A populated string with beginning whitespace given to the validator', () => {
    const providedValue = "   Populated";
    const expectedResult = "Populated"

    const result = emptyValidator.execute(providedValue);

    expect(result).toBe(ValidatorResponse.SUCCESS);
    expect(emptyValidator.result).toEqual(expectedResult)
});

test('A populated string with trailing whitespace given to the validator', () => {
    const providedValue = "Populated   ";
    const expectedResult = "Populated"

    const result = emptyValidator.execute(providedValue);

    expect(result).toBe(ValidatorResponse.SUCCESS);
    expect(emptyValidator.result).toEqual(expectedResult)
});

test('A populated string with beginning and trailing whitespace given to the validator', () => {
    const providedValue = "   Populated   ";
    const expectedResult = "Populated"

    const result = emptyValidator.execute(providedValue);

    expect(result).toBe(ValidatorResponse.SUCCESS);
    expect(emptyValidator.result).toEqual(expectedResult)
});