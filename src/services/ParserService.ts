import type {TermToken} from "../shared/types/TermToken.ts";
import {Operation, type OperationValue} from "../shared/types/Operation.ts";

export class ParserService {
    private isStringOperation(value: string): boolean {
        return value === Operation.Plus || value === Operation.Minus
            || value === Operation.Multiplication || value === Operation.Division || value === Operation.Percentage;
    }

    private isStringNumber(value: string): boolean {
        return !isNaN(Number(value)) || value === "."
    }

    private concatStringArray(stringArray: string[]): string {
        let concatValue = ""
        stringArray.forEach((item) => {
            concatValue = concatValue + item
        })
        return concatValue
    }

    private getArrayLengths(value: unknown): number[] {
        if (!Array.isArray(value)) {
            return [];
        }
        const result = [value.length];
        for (const element of value) {
            result.push(...this.getArrayLengths(element));
        }
        return result;
    }

    parseStringToArrayTerm(inputValue: string): TermToken[] {
        const termToken: TermToken[] = []
        let currentValue: string[] = []
        for (let index = 0; index < inputValue.length; index++) {
            const inputIndexValue = inputValue[index]
            const termTokenLeftElement = termToken[termToken.length - 1]
            if (this.isStringNumber(inputIndexValue)) {
                currentValue.push(inputIndexValue)
                if (this.isStringOperation(inputValue[index + 1]) || typeof inputValue[index + 1] === "undefined"
                    || inputValue[index + 1] === ")") {
                    termToken.push(+this.concatStringArray(currentValue))
                    currentValue = []
                }
            }
            if (this.isStringOperation(inputIndexValue)) {
                termToken.push(inputIndexValue as OperationValue)
            }
            // if(!isNaN(Number(termTokenLeftElement)) && inputIndexValue === "!"){
            //     termToken.push("!")
            // }
            if (inputIndexValue === "(") {
                if (!isNaN(Number(termTokenLeftElement))) { // || termTokenLeftElement.toString() === "!"
                    termToken.push(Operation.Multiplication)
                }
                const slicedInputValue = inputValue.slice(index + 1, inputValue.length)
                termToken.push(this.parseStringToArrayTerm(slicedInputValue))
                const getTermsWholeLength = this.getArrayLengths(termToken).reduce(
                    (accumulator, currentValue) => accumulator + currentValue, 0,
                )
                // index = index + (termToken[termToken.length - 1] as TermToken[]).length + 1
                index = index + getTermsWholeLength
            }
            if (inputIndexValue === ")") {
                return termToken
            }
        }
        return termToken
    }
}