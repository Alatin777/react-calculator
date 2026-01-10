import {Button} from "primereact/button";
import type {CalculatorButtonAction} from "../models/CalculatorButtonAction.ts";

interface CalculatorGridProps {
    calculatorButtonAction: CalculatorButtonAction[]
}

export function CalculatorGrid({calculatorButtonAction}: CalculatorGridProps) {
    return (
        <div className="grid">
            {
                calculatorButtonAction.map((item: CalculatorButtonAction) => (
                    <div className="col" key={item.id}>
                        <Button rounded={false} severity="success" className={`${item.class} w-5 justify-content-center`} label={item.label} onClick={item.action} />
                    </div>
                ))
            }
        </div>
    )
}