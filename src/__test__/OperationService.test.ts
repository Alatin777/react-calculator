import {beforeEach, describe, expect, test} from 'vitest'
import {OperationService} from "../services/OperationService.ts";
import {ParserService} from "../services/ParserService.ts";
import type {CalculatorState} from "../models/CalculatorState.ts";

describe('OperationService', () => {
    let operationService: OperationService;
    beforeEach(() => {
        operationService = new OperationService(new ParserService())
    })
    describe('evaluateLn', () => {
        test('evaluateLn ln(1) and get 0', () => {
            const calculatorState: CalculatorState = {
                inputValue: "1",
                history: []
            }
            expect(operationService.evaluateLn(calculatorState).inputValue).toBe("0")
        })
    });
    describe('negateNumber', () => {
        test('negate 5 and get -5', () => {
            const calculatorState: CalculatorState = {
                inputValue: "5",
                history: []
            }
            expect(operationService.negateNumber(calculatorState)).toBe(-5)
        })
    });
    describe('evaluateFactorial', () => {
        test('fact(3) and get 6', () => {
            const calculatorState: CalculatorState = {
                inputValue: "3",
                history: []
            }
            expect(operationService.evaluateFactorial(calculatorState).inputValue).toBe("6")
        })
    });
    describe('evaluateParsedValue', () => {
        test('[1,"+",2] is 3', () => {
            const calculatorState: CalculatorState = {
                inputValue: "1+2",
                history: []
            }
            expect(operationService.evaluateParsedValue(calculatorState)).toBe(3)
        })
        test('[1,"*",2] is 2', () => {
            const calculatorState: CalculatorState = {
                inputValue: "1*2",
                history: []
            }
            expect(operationService.evaluateParsedValue(calculatorState)).toBe(2)
        })
        test('[1 "+" 2,"*",5] is 11', () => {
            const calculatorState: CalculatorState = {
                inputValue: "1+2*5",
                history: []
            }
            expect(operationService.evaluateParsedValue(calculatorState)).toBe(11)
        })
        test('[1,"+",[2,"*",5]] is 11', () => {
            const calculatorState: CalculatorState = {
                inputValue: "1+(2*5)",
                history: []
            }
            expect(operationService.evaluateParsedValue(calculatorState)).toBe(11)
        })
        test('[1 "+" [2,"*",5],[2,"+",3]] is 51', () => {
            const calculatorState: CalculatorState = {
                inputValue: "1+(2*5)(2+3)",
                history: []
            }
            expect(operationService.evaluateParsedValue(calculatorState)).toBe(51)
        })
    })
    describe('addDigit', () => {
        test('add 1 and get "1"', () => {
            const calculatorState: CalculatorState = {
                inputValue: "",
                history: []
            }
            expect(operationService.addDigit(calculatorState, 1)).toStrictEqual({
                inputValue: "1",
                history: []
            })
        })
        test('add 1 and get "11"', () => {
            const calculatorState: CalculatorState = {
                inputValue: "1",
                history: []
            }
            expect(operationService.addDigit(calculatorState, 1)).toStrictEqual({
                inputValue: "11",
                history: []
            })
        })
    })
})