import type {TermToken} from "../shared/types/TermToken.ts";
import {Operation, type OperationValue} from "../shared/types/Operation.ts";
import {type MathFunctionValue} from "../shared/types/MathFunction.ts";

export class ParserService {
    private isStringOperation(value: string): boolean {
        return value === Operation.Plus || value === Operation.Minus
            || value === Operation.Multiplication || value === Operation.Division
            || value === Operation.Modulo || value === Operation.XPowerY;
    }

    private isStringNumber(value: string): boolean {
        return value >= "0" && value <= "9" || value === "."
    }

    private isStringLetter(value: string): boolean {
        if (typeof value === "undefined") {
            return false;
        }
        return !!(value.length === 1 && value.match(/[a-z]/i));
    }

    private isNumber(value: string): boolean {
        return !isNaN(Number(value))
    }

    private concatStringArray(strings: string[]): string {
        let concatValue = ""
        strings.forEach((char: string) => {
            concatValue = concatValue + char
        })
        return concatValue
    }

    private isCloseParenthese(value: string): boolean {
        return !!(typeof value !== "undefined" && Array.isArray(value));
    }

    private isFaculty(value: string): boolean {
        return typeof value !== "undefined" && value === "!";
    }

    private isOperandToken(value: string): boolean {
        return this.isNumber(value) || this.isFaculty(value) || this.isCloseParenthese(value);
    }

    private consumeIf(input: string, cursor: { index: number }, predicate: (value: string) => boolean): string[] {
        const inputValue = input[cursor.index]
        const currentArray: string[] = []
        if (predicate(inputValue)) {
            currentArray.push(inputValue);
            cursor.index++
            return currentArray.concat(this.consumeIf(input, cursor, predicate))
        }
        return currentArray;
    }

    private parseNumberStringToArray(input: string, cursor: { index: number }): string[] {
        return this.consumeIf(input, cursor, this.isStringNumber)
    }

    private parseLetterToArray(input: string, cursor: { index: number }): string[] {
        return this.consumeIf(input, cursor, this.isStringLetter)
    }

    parseStringToArrayTerm(input: string, cursor: { index: number }): TermToken[] {
        if (input.length === 0) {
            throw new Error("Input is empty.");
        }
        const termToken: TermToken[] = []
        while (cursor.index < input.length) {
            const termTokenLeftElement = termToken[termToken.length - 1]
            if(input[cursor.index] === Operation.Minus && cursor.index === 0 ||
                input[cursor.index] === Operation.Minus && input[cursor.index - 1] === "(" ){
                termToken.push(0)
            }
            if (this.isStringNumber(input[cursor.index])) {
                const parsedNumber: string[] = this.parseNumberStringToArray(input, cursor)
                termToken.push(+this.concatStringArray(parsedNumber))
                continue
            }
            if (this.isStringOperation(input[cursor.index]) || input[cursor.index] === "!") {
                termToken.push(input[cursor.index] as OperationValue)
                cursor.index++
                continue
            }

            if (this.isStringLetter(input[cursor.index])) {
                if (this.isOperandToken(termTokenLeftElement as string)) {
                    termToken.push(Operation.Multiplication)
                }
                const parsedLetters: string[] = this.parseLetterToArray(input, cursor)
                const concatinatedString: MathFunctionValue = this.concatStringArray(parsedLetters) as MathFunctionValue
                termToken.push(concatinatedString)
                continue
            }

            if (input[cursor.index] === "(") {
                if (this.isOperandToken(termTokenLeftElement as string)) {
                    termToken.push(Operation.Multiplication)
                }
                cursor.index++
                termToken.push(this.parseStringToArrayTerm(input, cursor))
                if(this.isStringNumber(input[cursor.index])){
                    termToken.push("*")
                }
                continue
            }

            if (input[cursor.index] === ")") {
                cursor.index++
                return termToken
            }

            throw new Error(`Unexpected character: ${input[cursor.index]}`);
        }
        return termToken;
    }
}