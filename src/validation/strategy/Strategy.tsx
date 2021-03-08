import { StrategyResult } from "./StrategyResult";

export interface Strategy<T> {
    execute(value: String | null): StrategyResult<T>;
} 