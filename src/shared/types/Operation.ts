export const Operation = {
    Plus: "+",
    Minus: "-",
    Multiplication: "*",
    Division: "/",
    Equal: "=",
    Modulo: "%",
    XPowerY: "^",
} as const;

export type OperationValue = typeof Operation[keyof typeof Operation];