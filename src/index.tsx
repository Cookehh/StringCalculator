import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Input from './Input';
import { TwoCommaDelimitedSumStrategy } from './validation/strategy/TwoCommaDelimitedSumStrategy';
import { CommaDelimitedNumberSumStrategy } from './validation/strategy/CommaDelimitedNumberSumStrategy';
import { CommaDelimitedCappedSumStrategy } from './validation/strategy/CommaDelimitedCappedSumStrategy';
import { PositiveCommaDelimitedNumberSumStrategy } from './validation/strategy/PositiveCommaDelimitedNumberSumStrategy';
import { CustomDelimitedSumStrategy } from './validation/strategy/CustomDelimitedSumStrategy';

ReactDOM.render(
  <React.StrictMode>
    <h1>Type 1: Two comma delimited numbers</h1>
    <Input strategy={new TwoCommaDelimitedSumStrategy()} />
    <h1>Type 2: X comma delimited numbers</h1>
    <Input strategy={new CommaDelimitedNumberSumStrategy()} />
    <h1>Type 3: Negative numbers ignored</h1>
    <Input strategy={new PositiveCommaDelimitedNumberSumStrategy()} />
    <h1>Type 4: Comma delimited capped numbers (capped at 1001)</h1>
    <Input strategy={new CommaDelimitedCappedSumStrategy(1001)} />
    <h1>Type 5: Custom delimiter in format //[delimiter]\n[values]</h1>
    <Input strategy={new CustomDelimitedSumStrategy(1001)} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
