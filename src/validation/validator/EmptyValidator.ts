import { Validator } from "./Validator";
import { ValidatorResponse } from "../ValidatorResponse";

export class EmptyValidator extends Validator<String, String> {

    result: String = "";
    inputValue: String = "";

    add(inValue: String): ValidatorResponse {
        this.inputValue = inValue;
        if (inValue.trim().length == 0) {
            return ValidatorResponse.EMPTY;
        }

        this.result = inValue.trim();

        return this.passToNextIfExists();
    }
}