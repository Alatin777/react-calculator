import {beforeEach, describe, expect, test} from "vitest";
import {ParserService} from "../services/ParserService.ts";
import type {TermToken} from "../shared/types/TermToken.ts";

describe('ParserService', () => {
    let parserService: ParserService;
    beforeEach(() => {
        parserService = new ParserService()
    })
    describe('parseStringToArrayTerm', () => {
        test('parse String "1+2" and get [1,"+",2]', () => {
            const inputValue: string = "1+2"
            const cursor: { index: number } = {index: 0}
            const termToken: TermToken[] = [1, "+", 2]
            const actual = parserService.parseStringToArrayTerm(inputValue, cursor)
            expect(actual).toStrictEqual(termToken)
        })
        test('parse String "-1+2" and get [0,"-",1,"+",2]', () => {
            const inputValue: string = "-1+2"
            const cursor: { index: number } = {index: 0}
            const termToken: TermToken[] = [0,"-",1,"+",2]
            const actual = parserService.parseStringToArrayTerm(inputValue, cursor)
            expect(actual).toStrictEqual(termToken)
        })
        test('parse String "(1+2)" and get [1,"+",2]', () => {
            const inputValue: string = "(1+2)"
            const cursor: { index: number } = {index: 0}
            const termToken: TermToken[] = [[1, "+", 2]]
            const actual = parserService.parseStringToArrayTerm(inputValue, cursor)
            expect(actual).toStrictEqual(termToken)
        })
        test('parse String "(-1+2)" and get [[0,"-",1, "+", 2]]', () => {
            const inputValue: string = "(-1+2)"
            const cursor: { index: number } = {index: 0}
            const termToken: TermToken[] = [[0,"-",1, "+", 2]]
            const actual = parserService.parseStringToArrayTerm(inputValue, cursor)
            expect(actual).toStrictEqual(termToken)
        })
        test('parse String "(1+2)3" and get [[1, "+", 2],"*",3]', () => {
            const inputValue: string = "(1+2)3"
            const cursor: { index: number } = {index: 0}
            const termToken: TermToken[] = [[1, "+", 2],"*",3]
            const actual = parserService.parseStringToArrayTerm(inputValue, cursor)
            expect(actual).toStrictEqual(termToken)
        })
        test('parse String "5(6+9)6+(1*3)2" and get [5,"*",[6, "+", 9],"*",6,"+",[1,"*",3],"*",2]', () => {
            const inputValue: string = "5(6+9)6+(1*3)2"
            const cursor: { index: number } = {index: 0}
            const termToken: TermToken[] = [5,"*",[6, "+", 9],"*",6,"+",[1,"*",3],"*",2]
            const actual = parserService.parseStringToArrayTerm(inputValue, cursor)
            expect(actual).toStrictEqual(termToken)
        })
        test('parse String "1+2*3" and get [1,"+",2,"*",3]', () => {
            const inputValue: string = "1+2*3"
            const cursor: { index: number } = {index: 0}
            const termToken: TermToken[] = [1, "+", 2, "*", 3]
            const actual = parserService.parseStringToArrayTerm(inputValue, cursor)
            expect(actual).toStrictEqual(termToken)
        })
        test('parse String "1+2(1+2)" and get [1,"+",2,"*",[1,"+",2]]', () => {
            const inputValue: string = "1+2(1+2)"
            const cursor: { index: number } = {index: 0}
            const termToken: TermToken[] = [1, "+", 2, "*", [1, "+", 2]]
            const actual = parserService.parseStringToArrayTerm(inputValue, cursor)
            expect(actual).toStrictEqual(termToken)
        })
        test('parse String "ln(1)" and get ["ln",[1]]', () => {
            const inputValue: string = "ln(1)"
            const cursor: { index: number } = {index: 0}
            const termToken: TermToken[] = ["ln", [1]]
            const actual = parserService.parseStringToArrayTerm(inputValue, cursor)
            expect(actual).toStrictEqual(termToken)
        })
        test('parse String "1(2+3)" and get [1,"*",[1,"+",2]]', () => {
            const inputValue: string = "1(2+3)"
            const cursor: { index: number } = {index: 0}
            const termToken: TermToken[] = [1, "*", [2, "+", 3]]
            const actual = parserService.parseStringToArrayTerm(inputValue, cursor)
            expect(actual).toStrictEqual(termToken)
        })
        test('parse String "sincos(1)" and get ["sin",["cos",[1]]]', () => {
            const inputValue: string = "sincos(1)"
            const cursor: { index: number } = {index: 0}
            const termToken: TermToken[] = ["sin", ["cos", [1]]]
            const actual = parserService.parseStringToArrayTerm(inputValue, cursor)
            expect(actual).toStrictEqual(termToken)
        })
        test('parse String "sin1" and get ["sin",[1]]', () => {
            const inputValue: string = "sin1"
            const cursor: { index: number } = {index: 0}
            const termToken: TermToken[] = ["sin", [1]]
            const actual = parserService.parseStringToArrayTerm(inputValue, cursor)
            expect(actual).toStrictEqual(termToken)
        })
        test('throw Error when symbol is @', () => {
            const inputValue: string = "@"
            const cursor: { index: number } = {index: 0}
            const expected = new Error(`Unexpected character: @`)
            expect(() => {
                parserService.parseStringToArrayTerm(inputValue, cursor)
            }).toThrow(expected)
        })
        test('throw Error when input contains >', () => {
            const inputValue: string = "2>"
            const cursor: { index: number } = {index: 0}
            const expected = new Error(`Unexpected character: >`)
            expect(() => {
                parserService.parseStringToArrayTerm(inputValue, cursor)
            }).toThrow(expected)
        })
        test('throw Error when input is empty', () => {
            const inputValue: string = ""
            const cursor: { index: number } = {index: 0}
            const expected = new Error("Input is empty.")
            expect(() => {
                parserService.parseStringToArrayTerm(inputValue, cursor)
            }).toThrow(expected)
        })
    })
})