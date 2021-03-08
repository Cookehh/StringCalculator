import { ValidatorResponse } from "../ValidatorResponse";
import { Validator } from "./Validator";

export class NullValidator extends Validator<String | null, String> {

    result: String = "";
    inputValue: String | null = null;

    validate(inValue: String | null): ValidatorResponse {
        this.inputValue = inValue;
        if (inValue == null) {
            return ValidatorResponse.NULL;
        }

        this.result = inValue!;

        return this.passToNextIfExists();
    }
}