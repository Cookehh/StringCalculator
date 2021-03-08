import { Validator } from "./Validator";
import { ValidatorResponse } from "../ValidatorResponse";

export class CommaDelimitedNumbersValidator extends Validator<String, Array<number>> {

    private delimiter: string;

    result: Array<number> = [];
    inputValue: String = "";

    constructor(delimiter: string, nextValidator: Validator<Array<number>, any> | null) {
        super(nextValidator);
        this.delimiter = delimiter;
    }

    add(inValue: String): ValidatorResponse {
        this.inputValue = inValue;
        const stringArray = inValue.split(this.delimiter);
        let numberArray: Array<number> = Array<number>(stringArray.length);

        for(let i = 0; i < stringArray.length; i++) {
            const stringValue = stringArray[i];
            if (stringValue.trim().length == 0) return ValidatorResponse.INVALID_FORMAT;
            const parsedNumber = Number(stringValue);
            if (!isNaN(parsedNumber)) numberArray[i] = parsedNumber;
            else return ValidatorResponse.INVALID_FORMAT;
        }

        this.result = numberArray;

        return this.passToNextIfExists();
    }

    updateDelimiter(delimiter: string) {
        this.delimiter = delimiter
    }
}