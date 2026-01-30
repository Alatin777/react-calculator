import type {CalculatorButtonAction} from "../models/CalculatorButtonAction.ts";
import {Button} from "primereact/button";

interface FlexGridCalculatorProps {
    calculatorButtonAction: CalculatorButtonAction[],
}

export function FlexGridCalculator({calculatorButtonAction}: FlexGridCalculatorProps) {
    return (
        <div className="flex flex-row gap-2 mb-1">
            {
                calculatorButtonAction.map((item: CalculatorButtonAction) => (
                    <div className="w-3" key={item.id}>
                        <Button rounded={false} severity={item.severity} className={`${item.class} w-full justify-content-center`} label={item.label} onClick={item.action} />
                    </div>
                ))
            }
        </div>
    )
}