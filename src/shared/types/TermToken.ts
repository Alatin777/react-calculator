import type {OperationValue} from "./Operation.ts";
import type {MathFunctionValue} from "./MathFunction.ts";

export type TermToken = number | OperationValue | TermToken[] | MathFunctionValue