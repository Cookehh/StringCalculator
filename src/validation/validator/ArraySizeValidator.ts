import { Validator } from "./Validator";
import { ValidatorResponse } from "../ValidatorResponse";

export class ArraySizeValidator extends Validator<Array<any>, Array<any>> {

    result: Array<any> = [];
    inputValue: Array<any> = [];
    private limit: number = 0;

    constructor(nextValidator: Validator<Array<any>, any> | null, lengthLimit: number) {
        super(nextValidator);
        this.limit = lengthLimit;
    }

    add(inValue: Array<any>): ValidatorResponse {
        this.inputValue = inValue;
        if (inValue.length > this.limit) return ValidatorResponse.INVALID_LENGTH;

        this.result = inValue;

        return this.passToNextIfExists();
    }
}