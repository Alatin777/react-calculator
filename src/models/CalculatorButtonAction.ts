import type {ButtonProps} from "primereact/button";

export interface CalculatorButtonAction {
    id: number;
    label?: string;
    class?: string;
    action?: () => void;
    severity?: ButtonProps["severity"];
}