export const Operation = {
    Plus: "+",
    Minus: "-",
    Multiplication: "*",
    Division: "/",
    Equal: "=",
    Percentage: "%",
} as const;

export type OperationValue = typeof Operation[keyof typeof Operation];