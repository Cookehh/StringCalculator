import { ValidatorResponse } from '../ValidatorResponse';
import { CommaDelimitedNumberSumStrategy } from './CommaDelimitedNumberSumStrategy';

var strategy = new CommaDelimitedNumberSumStrategy();

beforeEach(() => {
    strategy = new CommaDelimitedNumberSumStrategy();
})

test('Entering two numbers separated by commas should return sum', () => {
    const providedValue = "10, 5";
    const expectedResult = {
        validatorResponse: ValidatorResponse.SUCCESS,
        result: 15,
        errorMessage: null
    }

    const result = strategy.add(providedValue);

    expect(result).toEqual(expectedResult);
});

test('Entering one number should return the sum', () => {
    const providedValue = "13";
    const expectedResult = {
        validatorResponse: ValidatorResponse.SUCCESS,
        result: 13,
        errorMessage: null
    }

    const result = strategy.add(providedValue);

    expect(result).toEqual(expectedResult);
});

test('Entering three numbers should return the sum', () => {
    const providedValue = "13, 10, 2";
    const expectedResult = {
        validatorResponse: ValidatorResponse.SUCCESS,
        result: 25,
        errorMessage: null
    }

    const result = strategy.add(providedValue);

    expect(result).toEqual(expectedResult);
});

test('Entering null should return null', () => {
    const providedValue = null;
    const expectedResult = {
        validatorResponse: ValidatorResponse.NULL,
        result: null,
        errorMessage: null
    };

    const result = strategy.add(providedValue);

    expect(result).toEqual(expectedResult);
});

test('Entering an empty string should return success', () => {
    const providedValue = "";
    const expectedResult = {
        validatorResponse: ValidatorResponse.SUCCESS,
        result: 0,
        errorMessage: null
    };

    const result = strategy.add(providedValue);

    expect(result).toEqual(expectedResult);
});

test('Entering a non-comma delimited string should return null', () => {
    const providedValue = "32 123 22";
    const expectedResult = {
        validatorResponse: ValidatorResponse.INVALID_FORMAT,
        result: null,
        errorMessage: null
    };

    const result = strategy.add(providedValue);

    expect(result).toEqual(expectedResult);
});

test('Entering a non-number comma delimited string should return null', () => {
    const providedValue = "a, 123, 22";
    const expectedResult = {
        validatorResponse: ValidatorResponse.INVALID_FORMAT,
        result: null,
        errorMessage: null
    };

    const result = strategy.add(providedValue);

    expect(result).toEqual(expectedResult);
});