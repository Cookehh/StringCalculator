import { ValidatorResponse } from "../ValidatorResponse";

export interface StrategyResult<T> {
    validatorResponse: ValidatorResponse,
    result: T | null,
    errorMessage: string | null
}