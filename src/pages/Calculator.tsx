import type {CalculatorButtonAction} from "../models/CalculatorButtonAction.ts";
import {CalculatorGrid} from "../components/CalculatorGrid.tsx";
import {Card} from "primereact/card";
import {InputText} from "primereact/inputtext";
import {useState} from "react";
import {OperationService} from "../services/OperationService.ts";
import type {CalculatorState} from "../models/CalculatorState.ts";
import {Operation, type OperationValue} from "../shared/types/Operation.ts";

const operationService = new OperationService();

export function Calculator() {
    const [calculatorState, setCalculatorState] = useState<CalculatorState>({
        inputValue: "",
        term: [],
        isCalculated: false,
    });

    function handleDeleteToken() {
        setCalculatorState(prevState => {
            return operationService.deleteToken(prevState)
        })
    }

    function handleAddDigit(digit: number) {
        setCalculatorState(prevState => {
            return operationService.addDigit(prevState, digit)
        })
    }

    function handleAddOperation(operation: OperationValue) {
        setCalculatorState(prevState => {
            return operationService.addOperation(prevState, operation)
        })
    }

    function handleResetInput() {
        setCalculatorState(operationService.resetInput)
    }

    function handleEqualsOperation() {
        setCalculatorState(prevState => {
            if (prevState.inputValue.length === 0) {
                alert("You can't use Equals OperationService on empty field!")
                return prevState;
            }
            return {
                inputValue: prevState.inputValue + "=" + operationService.extractInputText(prevState),
                term: [operationService.extractInputText(prevState)],
                isCalculated: true,
            }
        })
    }

    // @formatter:off
    const object: (CalculatorButtonAction)[][] = [
        [
            { id:0, label: "2nd", action:()=>{ console.log("Reset") } },
            { id:1, label: "PI", action:()=>{ handleAddDigit(3.14) } },
            { id:2, label: "e", action:()=>{ handleAddDigit(2.71828) } },
            { id:3, label: "Reset", action:()=>{ handleResetInput() } },
            { id:4, class: "pi pi-delete-left", action:()=>{ handleDeleteToken() } },
        ],
        [
            { id:0, label: "square", action:()=>{ console.log("emtpy") } },
            { id:1, label: "1/x", action:()=>{ console.log("emtpy") } },
            { id:2, label: "|x|", action:()=>{ console.log("emtpy") } },
            { id:3, label: "exp", action:()=>{ console.log("Reset") } },
            { id:4, class: "pi pi-percentage", action:()=>{ handleAddOperation(Operation.Percentage) } },
        ],
        [
            { id:0, label: "squareRoot", action:()=>{ console.log("emtpy") } },
            { id:1, label: "(", action:()=>{ console.log("emtpy") } },
            { id:2, label: ")", action:()=>{ console.log("emtpy") } },
            { id:3, label: "n!", action:()=>{ console.log("Reset") } },
            { id:4, label: "/", action:()=>{ handleAddOperation(Operation.Division) } },
        ],
        [
            { id:0, label: "x^y", action:()=>{ console.log("emtpy") } },
            { id:1, label: "7", action:()=>{ handleAddDigit(7) } },
            { id:2, label: "8", action:()=>{ handleAddDigit(8) } },
            { id:3, label: "9", action:()=>{ handleAddDigit(9) } },
            { id:4, class: "pi pi-times", action:()=>{ handleAddOperation(Operation.Multiplication) } },
        ],
        [
            { id:0, label: "10^x", action:()=>{ console.log("emtpy") } },
            { id:1, label: "4", action:()=>{ handleAddDigit(4) } },
            { id:2, label: "5", action:()=>{ handleAddDigit(5) } },
            { id:3, label: "6", action:()=>{ handleAddDigit(6) } },
            { id:4, class: "pi pi-minus", action:()=>{ handleAddOperation(Operation.Minus) } },
        ],
        [
            { id:0, label: "log", action:()=>{ console.log("emtpy") } },
            { id:1, label: "1", action:()=>{ handleAddDigit(1) } },
            { id:2, label: "2", action:()=>{ handleAddDigit(2) } },
            { id:3, label: "3", action:()=>{ handleAddDigit(3) } },
            { id:4, class: "pi pi-plus", action:()=>{ handleAddOperation(Operation.Plus) } },
        ],
        [
            { id:0, label: "ln", action:()=>{ console.log("emtpy") } },
            { id:1, label: "+/-", action:()=>{ console.log("emtpy") } },
            { id:2, label: "0", action:()=>{ handleAddDigit(0) } },
            { id:3, label: ",", action:()=>{ console.log("Reset") } },
            { id:4, class: "pi pi-equals", action:()=>{ handleEqualsOperation() } },
        ],
    ];
    // @formatter:on
    return (
        <>
            <h1>Welcome to our Calculator Page.</h1>
            <p>Here you can use different calculation from normal Operation to high Operation and so on.</p>
            <Card>
                <InputText className="mb-6" placeholder="" value={calculatorState.inputValue}
                           onChange={
                               (e) => setCalculatorState(prevState => {
                                   return {
                                       inputValue: e.target.value,
                                       term: prevState.term,
                                       isCalculated: prevState.isCalculated
                                   }
                               })
                           }/>
                {
                    object.map((item, index) => (
                        <CalculatorGrid key={index} calculatorButtonAction={item}></CalculatorGrid>
                    ))
                }
            </Card>
        </>
    )
}