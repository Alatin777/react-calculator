import type {CalculatorState} from "../models/CalculatorState.ts";
import {Operation, type OperationValue} from "../shared/types/Operation.ts";
import type {TermToken} from "../shared/types/TermToken.ts";

export class OperationService {
    deleteToken(calculatorState: CalculatorState): CalculatorState {
        const newInputValue = calculatorState.inputValue.slice(0, calculatorState.inputValue.length - 1)
        const termLastIndex = calculatorState.term.length - 1
        const value = calculatorState.term[termLastIndex]
        if (typeof value !== "number") {
            return {
                ...calculatorState,
                inputValue: newInputValue,
                term: [...calculatorState.term.slice(0, termLastIndex)],
            };
        }
        return {
            ...calculatorState,
            inputValue: newInputValue,
            term: [...calculatorState.term.slice(0, termLastIndex), +value.toString().slice(0, value.toString().length - 1)],
        };
    }

    addDigit(calculatorState: CalculatorState, digit: number): CalculatorState {
        if (calculatorState.isCalculated) {
            return calculatorState;
        }
        const newInputValue = calculatorState.inputValue.concat(`${digit}`)
        const termLengthReduced = calculatorState.term.length - 1
        const value = calculatorState.term[termLengthReduced]
        if (typeof value !== "number") {
            return {
                ...calculatorState,
                inputValue: newInputValue,
                term: [...calculatorState.term, digit],
                isCalculated: calculatorState.isCalculated
            }
        }
        calculatorState.term.slice(0, calculatorState.term.length - 1).push(value * 10 + digit)
        return {
            ...calculatorState,
            inputValue: newInputValue,
            term: [...calculatorState.term.slice(0, termLengthReduced), value * 10 + digit],
            isCalculated: calculatorState.isCalculated
        }
    }

    addOperation(calculatorState: CalculatorState, operation: OperationValue): CalculatorState {
        if (calculatorState.inputValue.length === 0) {
            alert(`You can't use "${operation}" OperationService on empty field!`)
            return calculatorState;
        }
        const termLengthReduced = calculatorState.term.length - 1
        const value = calculatorState.term[termLengthReduced]
        if (typeof value !== "number") {
            return calculatorState;
        }
        return {
            ...calculatorState,
            inputValue: calculatorState.inputValue.concat(operation),
            term: [...calculatorState.term, operation],
            isCalculated: false
        }
    }

    resetInput(): CalculatorState {
        return {
            inputValue: "",
            term: [],
            isCalculated: false,
            history: [""],
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
            default:
                throw new Error("Unknown operator operator")
        }
    }

    negateNumber(num: number): number {
        return num * (-1)
    }

    calculateLog(num: number):number{
        return Math.log10(num)
    }

    calculateLn(num: number):number{
        return Math.log(num)
    }

    calculateTenPowerX(num: number):number{
        return Math.log10(num)
    }

    calculatePowXY(x: number, y: number):number{
        return Math.pow(x,y)
    }

    takeAbs(num: number){
        return Math.abs(num)
    }

    calculateOneDividedBy(num:number): number{
        return num > 0 ? 1 / num : -1
    }

    Factorial(num: number): number {
        if (num == 0) {
            return 1;
        }
        if (num == 1) {
            return 1;
        }
        return num * this.Factorial(num - 1)
    }

    private calculatePointOperationFirst(calculatorState: CalculatorState): (TermToken)[] {
        const calculatedTerm: TermToken[] = []
        for(const [index,element] of calculatorState.term.entries()) {
            if(typeof calculatedTerm[calculatedTerm.length - 1] === "number" && typeof calculatorState.term[index + 1] !== "number"){
                continue
            }
            if ((element === Operation.Multiplication || element === Operation.Division || element === Operation.Percentage)) {
                const leftTerm = calculatedTerm[calculatedTerm.length - 1]
                const rightTerm = calculatorState.term[index + 1]
                const res = this.calculate(leftTerm as number, element, rightTerm as number)
                calculatedTerm.pop()
                calculatedTerm.push(res)
                continue
            }
            calculatedTerm.push(element)
        }
        return calculatedTerm
    }

    extractInputText(calculatorState: CalculatorState): number {
        let numberOne: number | null = null
        let operation: OperationValue | null = null
        let numberTwo: number | null = null
        let result: number = 0
        const sortedTerm = this.calculatePointOperationFirst(calculatorState)
        if (sortedTerm.length === 1) {
            return sortedTerm[0] as number;
        }
        sortedTerm.forEach(element => {
            if (typeof element === "number" && numberOne === null) {
                numberOne = element;
                return;
            }
            if (typeof element !== "number" && operation === null) {
                operation = element as OperationValue;
                return;
            }
            if (typeof element === "number" && numberOne !== null && numberTwo === null) {
                numberTwo = element;
            }
            if (numberOne !== null && numberTwo !== null && operation !== null) {
                numberOne = this.calculate(numberOne as number, operation as OperationValue, numberTwo as number)
                numberTwo = null
                operation = null
                result = numberOne
            }
        })
        return result
    }
}