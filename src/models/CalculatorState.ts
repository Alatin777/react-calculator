import type {TermToken} from "../shared/types/TermToken.ts";

export interface CalculatorState {
    inputValue: string,
    term: TermToken[],
    isCalculated: boolean,
    history: string[],
}