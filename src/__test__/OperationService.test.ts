import {beforeEach, describe, expect, test} from 'vitest'
import {OperationService} from "../services/OperationService.ts";
import {ParserService} from "../services/ParserService.ts";
import type {CalculatorState} from "../models/CalculatorState.ts";

describe('OperationService', () => {
    let operationService: OperationService;
    beforeEach(() => {
        operationService = new OperationService(new ParserService())
    })
    describe('calculateLn', () => {
        test('calculate ln(1) and get 0', () => {
            expect(operationService.calculateLn(1)).toBe(0)
        })
    });
    describe('negateNumber', () => {
        test('negate 5 and get -5', () => {
            const calculatorState: CalculatorState = {
                inputValue: "5",
                term: [],
                isCalculated: false,
                history: []
            }
            expect(operationService.negateNumber(calculatorState)).toBe(-5)
        })
    });
    describe('evaluateFactorial', () => {
        test('fact(3) and get 6', () => {
            const calculatorState: CalculatorState = {
                inputValue: "3",
                term: [],
                isCalculated: false,
                history: []
            }
            expect(operationService.evaluateFactorial(calculatorState)).toBe(6)
        })
    });
    describe('evaluateParsedValue', () => {
        test('[1,"+",2] is 3', () => {
            const calculatorState: CalculatorState = {
                inputValue: "1+2",
                term: [],
                isCalculated: false,
                history: []
            }
            expect(operationService.evaluateParsedValue(calculatorState)).toBe(3)
        })
        test('[1,"*",2] is 2', () => {
            const calculatorState: CalculatorState = {
                inputValue: "1*2",
                term: [],
                isCalculated: false,
                history: []
            }
            expect(operationService.evaluateParsedValue(calculatorState)).toBe(2)
        })
        test('[1 "+" 2,"*",5] is 11', () => {
            const calculatorState: CalculatorState = {
                inputValue: "1+2*5",
                term: [],
                isCalculated: false,
                history: []
            }
            expect(operationService.evaluateParsedValue(calculatorState)).toBe(11)
        })
        test('[1,"+",[2,"*",5]] is 11', () => {
            const calculatorState: CalculatorState = {
                inputValue: "1+(2*5)",
                term: [],
                isCalculated: false,
                history: []
            }
            expect(operationService.evaluateParsedValue(calculatorState)).toBe(11)
        })
        test('[1 "+" [2,"*",5],[2,"+",3]] is 51', () => {
            const calculatorState: CalculatorState = {
                inputValue: "1+(2*5)(2+3)",
                term: [],
                isCalculated: false,
                history: []
            }
            expect(operationService.evaluateParsedValue(calculatorState)).toBe(51)
        })
    })
    describe('addDigit', () => {
        test('add 1 and get "1"', () => {
            const calculatorState: CalculatorState = {
                inputValue: "",
                term: [],
                isCalculated: false,
                history: []
            }
            expect(operationService.addDigit(calculatorState, 1)).toStrictEqual({
                inputValue: "1",
                term: [],
                isCalculated: false,
                history: []
            })
        })
        test('add 1 and get "11"', () => {
            const calculatorState: CalculatorState = {
                inputValue: "1",
                term: [],
                isCalculated: false,
                history: []
            }
            expect(operationService.addDigit(calculatorState, 1)).toStrictEqual({
                inputValue: "11",
                term: [],
                isCalculated: false,
                history: []
            })
        })
    })
})