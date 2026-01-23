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
        test('parse String "(1+2)" and get [1,"+",2]', () => {
            const inputValue: string = "(1+2)"
            const cursor: { index: number } = {index: 0}
            const termToken: TermToken[] = [[1, "+", 2]]
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
        test('parse String "1(2+3)" and get [1,*,[1+2]]', () => {
            const inputValue: string = "1(2+3)"
            const cursor: { index: number } = {index: 0}
            const termToken: TermToken[] = [1, "*", [2, "+", 3]]
            const actual = parserService.parseStringToArrayTerm(inputValue, cursor)
            expect(actual).toStrictEqual(termToken)
        })
        test('parse String "eln(1)" and get ["e","*","ln",[1]]', () => {
            const inputValue: string = "eln(1)"
            const cursor: { index: number } = {index: 0}
            const termToken: TermToken[] = ["e","*","ln",[1]]
            const actual = parserService.parseStringToArrayTerm(inputValue, cursor)
            expect(actual).toStrictEqual(termToken)
        })
    })
})