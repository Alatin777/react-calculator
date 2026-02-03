import {Operation} from "../types/Operation.ts";

export class HelperService {
    isPartOfNumber(value: string): boolean {
        return !Number.isNaN(+value) || value === Operation.Minus || value === ".";
    }
}