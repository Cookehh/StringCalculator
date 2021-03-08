import { ValidatorResponse } from "../ValidatorResponse"

export abstract class Validator<T, S> {

    public abstract result: S;
    public abstract inputValue: T;
    protected next: Validator<S, any> | null;

    constructor(nextValidator: Validator<S, any> | null) {
        this.next = nextValidator;
    }

    abstract add(inValue: T): ValidatorResponse;

    protected passToNextIfExists(): ValidatorResponse {
        if(this.next != null) return this.next.add(this.result);
        else return ValidatorResponse.SUCCESS;
    }
}