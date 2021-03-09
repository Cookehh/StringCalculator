import { ArraySizeValidator } from "../validator/ArraySizeValidator";
import { CommaDelimitedNumbersValidator } from "../validator/CommaDelimitedNumbersValidator";
import { EmptyValidator } from "../validator/EmptyValidator";
import { NullValidator } from "../validator/NullValidator";
import { Validator } from "../validator/Validator"
import { ValidatorResponse } from "../ValidatorResponse";
import { Strategy } from "./Strategy";
import { StrategyResult } from "./StrategyResult";

export class TwoCommaDelimitedSumStrategy implements Strategy<Number>{
    private firstInChain: Validator<String| null, any>;
    private lastInChain: Validator<any, Array<number>>;

    constructor() {
        this.lastInChain = new ArraySizeValidator(null, 2)
        this.firstInChain = new NullValidator(
            new EmptyValidator(
                new CommaDelimitedNumbersValidator(",", this.lastInChain))
        );
    }

    public add(value: string | null): StrategyResult<number> {
        const validatorResponse = this.firstInChain.execute(value);
        let result = this.calculateResult(validatorResponse);
        return {
            validatorResponse: validatorResponse == ValidatorResponse.EMPTY 
                ? ValidatorResponse.SUCCESS : validatorResponse,
            result: result,
            errorMessage: null
        };
    }

    private calculateResult(validatorResponse: ValidatorResponse): number | null {
        if (validatorResponse == ValidatorResponse.EMPTY) return 0;
        if (validatorResponse != ValidatorResponse.SUCCESS) return null;
        const numbers = this.lastInChain.result;
        let sum = 0;
        numbers.forEach(number => {
            sum += number;
        });
        return sum;
    }
}