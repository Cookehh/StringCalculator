import { Validator } from "./Validator";
import { ValidatorResponse } from "../ValidatorResponse";

export class NegativeArrayValidator extends Validator<Array<number>, Array<number>> {

    result: Array<number> = [];
    inputValue: Array<number> = [];

    execute(inValue: Array<number>): ValidatorResponse {
        this.inputValue = inValue;
        
        for (let arrayValue of inValue) {
            if (arrayValue < 0) return ValidatorResponse.NEGATIVE;
        }

        this.result = inValue;

        return this.passToNextIfExists();
    }
}