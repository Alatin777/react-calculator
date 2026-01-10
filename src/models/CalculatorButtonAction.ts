export interface CalculatorButtonAction {
    id: number;
    label?: string;
    class?: string;
    action?: () => void;
}