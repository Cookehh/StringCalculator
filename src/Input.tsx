import React from 'react';
import { Strategy } from './validation/strategy/Strategy';
import { ValidatorResponse } from './validation/ValidatorResponse';

interface InputProps {
    strategy: Strategy<number>;
}
  
interface InputState{
    result: number | null;
    errorMessage: string | null
}

class Input extends React.Component<InputProps, InputState> {

    private strategy: Strategy<number>;

    constructor(props: InputProps) {
        super(props);
        this.strategy = props.strategy;
        this.calculateResult = this.calculateResult.bind(this)
    }

    render() {
        return (
        <div className="Input">
            <input type="text" placeholder="Please enter your values" onChange={this.calculateResult} onClick={this.calculateResult}></input>
            <label>Result: {this.state?.result == null ? "" : this.state.result}</label>
            <div>{this.state?.errorMessage != null ? this.state.errorMessage : ""} </div>
        </div>
        );
    }

    private calculateResult(event: any) {
        let output = this.strategy.add(event.target.value)
        if (output.validatorResponse == ValidatorResponse.SUCCESS) {
            this.setState({result: output.result, errorMessage: null})
        }
        else this.setState({result: null, errorMessage: output.errorMessage})
    }
}

export default Input;