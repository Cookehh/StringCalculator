import { StrategyResult } from "./StrategyResult";

export interface Strategy<T> {
    add(value: String | null): StrategyResult<T>;
} 