import { CommaDelimitedNumbersValidator } from "../validator/CommaDelimitedNumbersValidator";
import { EmptyValidator } from "../validator/EmptyValidator";
import { NegativeArrayValidator } from "../validator/NegativeArrayValidator";
import { NullValidator } from "../validator/NullValidator";
import { Validator } from "../validator/Validator"
import { ValidatorResponse } from "../ValidatorResponse";
import { Strategy } from "./Strategy";
import { StrategyResult } from "./StrategyResult";

export class CustomDelimitedSumStrategy implements Strategy<Number>{
    private firstInChain: Validator< String| null, any>;
    private lastInChain: Validator<Array<number>, Array<number>>;
    private commaDelimitedValidator: CommaDelimitedNumbersValidator;
    private readonly defaultDelimiter: string = ",";
    private cap: number;

    constructor(cap: number) {
        this.lastInChain = new NegativeArrayValidator(null);
        this.commaDelimitedValidator = new CommaDelimitedNumbersValidator(",", this.lastInChain)
        this.firstInChain = new NullValidator(
            new EmptyValidator(
                this.commaDelimitedValidator)
        );
        this.cap = cap
    }

    public execute(value: string | null): StrategyResult<number> {
        let parsedResult = this.parseDelimiter(value);
        const validatorResponse = this.firstInChain.add(parsedResult);
        let result = this.calculateResult(validatorResponse);
        let error = this.calculateError(validatorResponse);
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
            if (number < this.cap) sum += number;
        });
        return sum;
    }

    private calculateError(validatorResponse: ValidatorResponse): string | null {
        let error: string | null = null
        switch(validatorResponse) {
            case ValidatorResponse.NEGATIVE: {
                error = "Negatives not allowed: " + this.lastInChain.inputValue.filter(x => x < 0);
            }
        }
        return error
    }

    private parseDelimiter(value: string | null): string | null{
        this.commaDelimitedValidator.updateDelimiter(this.defaultDelimiter);
        if (value == null) return value;
        
        let stringToParse = value;
        const regex = new RegExp(/^\/\/[\D]*[\\n]/gm);
        let result = regex.test(value);
        if (result) {
            let delimiterValueArray = this.getDelimiterFromString(value);
            if (delimiterValueArray != null) {
                this.commaDelimitedValidator.updateDelimiter(delimiterValueArray[0]);
                stringToParse = delimiterValueArray[1];
            }
        }
        return stringToParse;
    }

    private getDelimiterFromString(value: string): string[] | null {
        let withoutForwardSlash = value.replace("//", "");
        let splitArray = withoutForwardSlash.split("\\n");
        if (splitArray.length != 2) return null;
        return splitArray;
    }
}