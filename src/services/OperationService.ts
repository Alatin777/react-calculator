import type {CalculatorState} from "../models/CalculatorState.ts";
import {Operation, type OperationValue} from "../shared/types/Operation.ts";
import type {TermToken} from "../shared/types/TermToken.ts";
import type {ParserService} from "./ParserService.ts";
import {HelperService} from "../shared/helperFunctions/HelperService.ts";

export class OperationService {
    private parserService: ParserService;
    private helperService: HelperService;

    constructor(parserService: ParserService) {
        this.parserService = parserService;
        this.helperService = new HelperService();
    }

    deleteToken(calculatorState: CalculatorState): CalculatorState {
        return {
            ...calculatorState,
            inputValue: calculatorState.inputValue.slice(0, calculatorState.inputValue.length - 1),
        };
    }

    addDigit(calculatorState: CalculatorState, digit: number): CalculatorState {
        return {
            ...calculatorState,
            inputValue: calculatorState.inputValue.concat(`${digit}`),
        }
    }

    addOperation(calculatorState: CalculatorState, operation: OperationValue): CalculatorState {
        if (calculatorState.inputValue.length === 0 && operation !== Operation.Minus) {
            return calculatorState;
        }
        return {
            ...calculatorState,
            inputValue: calculatorState.inputValue.concat(operation),
        }
    }

    resetInput(history: string[]): CalculatorState {
        return {
            inputValue: "",
            history: history,
        }
    }

    private calculate(numberOne: number, operator: OperationValue, numberTwo: number): number {
        switch (operator) {
            case "+":
                return numberOne + numberTwo
            case "-":
                return numberOne - numberTwo
            case "*":
                return numberOne * numberTwo
            case "/":
                return numberOne / numberTwo
            case "%":
                return numberOne % numberTwo
            case "^":
                return this.evaluateXPowY(numberOne, numberTwo)
            default:
                throw new Error(`Unknown operator ${operator}`)
        }
    }

    private applyNumberTransform(calculatorState: CalculatorState, mathOperationName: string, mathFunction: (num: number) => number): CalculatorState {
        let inputNext = ""
        let valueToEvaluate = ""
        for (let i = calculatorState.inputValue.length - 1; this.helperService.isPartOfNumber(calculatorState.inputValue[i]); i--) {
            valueToEvaluate = calculatorState.inputValue[i] + valueToEvaluate
            inputNext = calculatorState.inputValue.slice(0, i)
        }
        return {
            ...calculatorState,
            inputValue: inputNext + `${mathFunction(+valueToEvaluate)}`,
            history: [...calculatorState.history, `${mathOperationName}(` + calculatorState.inputValue + ")=" + `${mathFunction(+valueToEvaluate)}`]
        }
    }

    negateNumber(calculatorState: CalculatorState): CalculatorState {
        return this.applyNumberTransform(calculatorState, "neg", (num: number) => -num)
    }

    evaluateLog(calculatorState: CalculatorState): CalculatorState {
        return this.applyNumberTransform(calculatorState, "log", Math.log10)
    }

    evaluatePercentageNumber(calculatorState: CalculatorState): CalculatorState {
        return this.applyNumberTransform(calculatorState, "%", (num: number) => num * 100)
    }

    evaluateDecimalNumber(calculatorState: CalculatorState): CalculatorState {
        return this.applyNumberTransform(calculatorState, "d", (num: number) => num / 100)
    }

    private factorial(num: number): number {
        return (num === 0 || num === 1) ? 1 : num * this.factorial(num - 1)
    }

    evaluateFactorial(calculatorState: CalculatorState): CalculatorState {
        return this.applyNumberTransform(calculatorState, "fact", this.factorial.bind(this))
    }

    evaluateXPowerTwo(calculatorState: CalculatorState): CalculatorState{
        return this.applyNumberTransform(calculatorState, "x^2",
            (num: number) => Math.pow(num, 2)
        )
    }

    evaluateSquareRoot(calculatorState: CalculatorState): CalculatorState {
        return this.applyNumberTransform(calculatorState, "sqrt", Math.sqrt)
    }

    evaluateLn(calculatorState: CalculatorState): CalculatorState {
        return this.applyNumberTransform(calculatorState, "ln", Math.log)
    }

    evaluateTenPowerX(calculatorState: CalculatorState): CalculatorState {
        return this.applyNumberTransform(calculatorState, "10^x",
            (num: number) => Math.pow(10, num)
        )
    }

    private evaluateXPowY(x: number, y: number): number {
        return Math.pow(x, y)
    }

    takeAbs(calculatorState: CalculatorState): CalculatorState {
        return this.applyNumberTransform(calculatorState, "abs", Math.abs)
    }

    evaluateOneDividedBy(calculatorState: CalculatorState): CalculatorState {
        return this.applyNumberTransform(calculatorState, "1 / ",
            (num: number) => num > 0 ? 1 / num : -1)
    }

    evaluateParsedValue(calculatorState: CalculatorState): number {
        const parsedTerm = this.parserService.parseStringToArrayTerm(calculatorState.inputValue, {index: 0});
        return this.evaluateTerm(parsedTerm);
    }

    private isTermDotOperation(element: TermToken): boolean {
        return element === Operation.Multiplication || element === Operation.Division || element === Operation.Modulo;
    }

    private isTermParenthesis(element: TermToken): element is TermToken[] {
        return Array.isArray(element)
    }

    private isTermNumber(element: TermToken): element is number {
        return typeof element === "number";
    }

    private getNumericValue(element: TermToken): number {
        if (this.isTermParenthesis(element)) {
            return this.evaluateTerm(element as TermToken[])
        }
        if (this.isTermNumber(element)) {
            return element;
        }
        throw Error(`Value is not a number but ${element}`);
    }

    private evaluateTerm(term: TermToken[]): number {
        const result: TermToken[] = []
        for (let i = 0; i < term.length; i++) {
            if (this.isTermParenthesis(term[i])) {
                result.push(this.evaluateTerm(term[i] as TermToken[]));
            } else if (this.isTermDotOperation(term[i])) {
                const left = result.pop() as number;
                if (!this.isTermNumber(left)) {
                    throw Error(`Left Term is not a number but ${left}`);
                }
                const right = this.getNumericValue(term[++i])
                result.push(this.calculate(left, term[i - 1] as OperationValue, right));
            } else {
                result.push(term[i]);
            }
        }
        return this.evaluateDashOperation(result)
    }

    private evaluateDashOperation(term: TermToken[]): number {
        let left = term[0] as number;
        for (let i = 1; i < term.length; i += 2) {
            let right = 0
            if (this.isTermParenthesis(term[i + 1])) {
                right = this.evaluateTerm(term[i + 1] as TermToken[])
            } else {
                right = term[i + 1] as number;
            }
            left = this.calculate(left, term[i] as OperationValue, right);
        }
        return left;
    }
}