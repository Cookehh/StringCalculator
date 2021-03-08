import { CommaDelimitedNumbersValidator } from "../validator/CommaDelimitedNumbersValidator";
import { EmptyValidator } from "../validator/EmptyValidator";
import { NegativeArrayValidator } from "../validator/NegativeArrayValidator";
import { NullValidator } from "../validator/NullValidator";
import { Validator } from "../validator/Validator"
import { ValidatorResponse } from "../ValidatorResponse";
import { Strategy } from "./Strategy";
import { StrategyResult } from "./StrategyResult";

export class PositiveCommaDelimitedNumberSumStrategy implements Strategy<number> {
    private firstInChain: Validator<String| null, any>;
    private lastInChain: Validator<Array<number>, Array<number>>;

    constructor() {
        this.lastInChain = new NegativeArrayValidator(null);
        this.firstInChain = new NullValidator(
            new EmptyValidator(
                new CommaDelimitedNumbersValidator(",", this.lastInChain)
            )
        );
    }

    public execute(value: String | null): StrategyResult<number> {
        const validatorResponse = this.firstInChain.add(value);
        let result = this.calculateResult(validatorResponse);
        let error = this.calculateError(validatorResponse)
        return {
            validatorResponse: validatorResponse == ValidatorResponse.EMPTY 
                ? ValidatorResponse.SUCCESS : validatorResponse,
            result: result,
            errorMessage: error
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

    private calculateError(validatorResponse: ValidatorResponse): string | null {
        let error: string | null = null;
        switch(validatorResponse) {
            case ValidatorResponse.NEGATIVE: {
                error = "Negatives not allowed: " + this.lastInChain.inputValue.filter(x => x < 0);
            }
        }
        return error;
    }
}