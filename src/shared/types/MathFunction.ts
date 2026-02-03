export const MathFunction = {
    Sinus: "sin",
    Cosinus: "cos",
    Tangents: "tan",
    Log: "log",
    Ln: "ln",
    Pow: "pow",
    Square: "sq",
    SquareRoot: "sqrt",
    Negate: "neg",
} as const;

export type MathFunctionValue = typeof MathFunction[keyof typeof MathFunction];