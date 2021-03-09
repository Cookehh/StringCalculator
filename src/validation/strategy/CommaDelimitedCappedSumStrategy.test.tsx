import { ValidatorResponse } from '../ValidatorResponse';
import { CommaDelimitedCappedSumStrategy } from './CommaDelimitedCappedSumStrategy';

test('Entering two numbers below cap separated by commas should return sum', () => {
    var strategy = new CommaDelimitedCappedSumStrategy(100);
    const providedValue = "10, 5";
    const expectedResult = {
        validatorResponse: ValidatorResponse.SUCCESS,
        result: 15,
        errorMessage: null
    }

    const result = strategy.add(providedValue);

    expect(result).toEqual(expectedResult);
});

test('Entering one number below cap should return the sum', () => {
    var strategy = new CommaDelimitedCappedSumStrategy(100);
    const providedValue = "3";
    const expectedResult = {
        validatorResponse: ValidatorResponse.SUCCESS,
        result: 3,
        errorMessage: null
    }

    const result = strategy.add(providedValue);

    expect(result).toEqual(expectedResult);
});

test('Entering three numbers below cap should return the sum', () => {
    var strategy = new CommaDelimitedCappedSumStrategy(100);
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
    var strategy = new CommaDelimitedCappedSumStrategy(100);
    const providedValue = null;
    const expectedResult = {
        validatorResponse: ValidatorResponse.NULL,
        result: null,
        errorMessage: null
    };

    const result = strategy.add(providedValue);

    expect(result).toEqual(expectedResult);
});

test('Entering an empty string should return 0', () => {
    var strategy = new CommaDelimitedCappedSumStrategy(100);
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
    var strategy = new CommaDelimitedCappedSumStrategy(100);
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
    var strategy = new CommaDelimitedCappedSumStrategy(100);
    const providedValue = "a, 123, 22";
    const expectedResult = {
        validatorResponse: ValidatorResponse.INVALID_FORMAT,
        result: null,
        errorMessage: null
    };

    const result = strategy.add(providedValue);

    expect(result).toEqual(expectedResult);
});

test('Entering a value above cap should ignore value', () => {
    var strategy = new CommaDelimitedCappedSumStrategy(100);
    const providedValue = "123";
    const expectedResult = {
        validatorResponse: ValidatorResponse.SUCCESS,
        result: 0,
        errorMessage: null
    };

    const result = strategy.add(providedValue);

    expect(result).toEqual(expectedResult);
});

test('Entering a comma delimited string with all values below 0 should return an error message', () => {
    var strategy = new CommaDelimitedCappedSumStrategy(-6);
    const providedValue = "-10, -5";
    const expectedResult = {
        validatorResponse: ValidatorResponse.NEGATIVE,
        result: null,
        errorMessage: "Negatives not allowed: -10,-5"
    };

    const result = strategy.add(providedValue);

    expect(result).toEqual(expectedResult);
});