import { ValidatorResponse } from '../ValidatorResponse';
import { CustomDelimitedSumStrategy } from './CustomDelimitedSumStrategy';

var strategy = new CustomDelimitedSumStrategy(100);

beforeEach(() => {
    strategy = new CustomDelimitedSumStrategy(100);
})

test('Entering two numbers separated by commas should return sum', () => {
    const providedValue = "10, 5";
    const expectedResult = {
        validatorResponse: ValidatorResponse.SUCCESS,
        result: 15,
        errorMessage: null
    };

    const result = strategy.execute(providedValue);

    expect(result).toEqual(expectedResult);
});

test('Entering one number should return the sum', () => {
    const providedValue = "13";
    const expectedResult = {
        validatorResponse: ValidatorResponse.SUCCESS,
        result: 13,
        errorMessage: null
    };

    const result = strategy.execute(providedValue);

    expect(result).toEqual(expectedResult);
});

test('Entering three numbers should return success', () => {
    const providedValue = "13, 10, 2";
    const expectedResult = {
        validatorResponse: ValidatorResponse.SUCCESS,
        result: 25,
        errorMessage: null
    };

    const result = strategy.execute(providedValue);

    expect(result).toEqual(expectedResult);
});

test('Entering null should return null', () => {
    const providedValue = null;
    const expectedResult = {
        validatorResponse: ValidatorResponse.NULL,
        result: null,
        errorMessage: null
    };

    const result = strategy.execute(providedValue);

    expect(result).toEqual(expectedResult);
});

test('Entering an empty string should return success', () => {
    const providedValue = "";
    const expectedResult = {
        validatorResponse: ValidatorResponse.SUCCESS,
        result: 0,
        errorMessage: null
    };

    const result = strategy.execute(providedValue);

    expect(result).toEqual(expectedResult);
});

test('Entering a non-comma delimited string without prefix should return null', () => {
    const providedValue = "32 123 22";
    const expectedResult = {
        validatorResponse: ValidatorResponse.INVALID_FORMAT,
        result: null,
        errorMessage: null
    };

    const result = strategy.execute(providedValue);

    expect(result).toEqual(expectedResult);
});

test('Entering a non-number comma delimited string should return null', () => {
    const providedValue = "a 123 22";
    const expectedResult = {
        validatorResponse: ValidatorResponse.INVALID_FORMAT,
        result: null,
        errorMessage: null
    };

    const result = strategy.execute(providedValue);

    expect(result).toEqual(expectedResult);
});

test('Entering a colon delimited string should return success', () => {
    const providedValue = "//:\\n1:2:3: 4";
    const expectedResult = {
        validatorResponse: ValidatorResponse.SUCCESS,
        result: 10,
        errorMessage: null
    };

    const result = strategy.execute(providedValue);

    expect(result).toEqual(expectedResult);
});

test('Entering a comma delimited string with all values below 0 should return an error message', () => {
    const providedValue = "-10, -5";
    const expectedResult = {
        validatorResponse: ValidatorResponse.NEGATIVE,
        result: null,
        errorMessage: "Negatives not allowed: -10,-5"
    };

    const result = strategy.execute(providedValue);

    expect(result).toEqual(expectedResult);
});