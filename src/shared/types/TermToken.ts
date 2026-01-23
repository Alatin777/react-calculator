import type {OperationValue} from "./Operation.ts";
import type {MathFunction} from "./MathFunction.ts";

export type TermToken = number | OperationValue | TermToken[] | MathFunction