export const MathFunction = {
    Sinus: "sin",
    Cosinus: "cos",
    Tangents: "tan",
    Log: "log",
    Ln: "ln",
    E: "e",
    Pow: "pow",
    Square: "sq",
    SquareRoot: "sqrt",
    Negate: "neg",
    Pi: "pi"
} as const;

export type MathFunctionValue = typeof MathFunction[keyof typeof MathFunction];