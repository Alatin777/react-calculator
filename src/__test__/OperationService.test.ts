import {beforeEach, describe, expect, test} from 'vitest'
import {OperationService} from "../services/OperationService.ts";

describe('OperationService', () => {
    let operationService: OperationService;
    beforeEach(() => {
        operationService = new OperationService()
    })
    describe('calculateLn', () => {
        test('calculate ln(1) and get 0', () => {
            expect(operationService.calculateLn(1)).toBe(0)
        })
    });
})
