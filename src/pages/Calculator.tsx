import type {CalculatorButtonAction} from "../models/CalculatorButtonAction.ts";
import {CalculatorGrid} from "../components/CalculatorGrid.tsx";
import {Card} from "primereact/card";
import {InputText} from "primereact/inputtext";
import {OperationService} from "../services/OperationService.ts";
import type {CalculatorState} from "../models/CalculatorState.ts";
import {Operation, type OperationValue} from "../shared/types/Operation.ts";
import {Button} from "primereact/button";
import {useState} from "react";
import {ParserService} from "../services/ParserService.ts";

const operationService = new OperationService();
const helperService = new ParserService();

export function Calculator() {
    const [calculatorState, setCalculatorState] = useState<CalculatorState>({
        inputValue: "",
        term: [],
        isCalculated: false,
        history: [],
    });

    const eulerNumber: number = Math.E
    const pi: number = Math.PI

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
                inputValue: `${operationService.extractInputText(prevState)}`,
                term: [operationService.extractInputText(prevState)],
                isCalculated: true,
                history: [...prevState.history, prevState.inputValue + "=" + operationService.extractInputText(prevState) + "\n"]
            }
        })
    }

    function handleNegateOperation() {
        setCalculatorState(prevState => {
            const termNext = operationService.negateNumber(prevState.term[prevState.term.length - 1] as number)
            let inputNext = ""
            for (let i = prevState.inputValue.length - 1; !Number.isNaN(+prevState.inputValue[i]); i--) {
                console.log(`When? ${prevState.inputValue.slice(0, i)}`)
                inputNext = prevState.inputValue.slice(0, i)
            }
            return {
                ...prevState,
                term: [...prevState.term.slice(0, -1), termNext],
                inputValue: inputNext + `${termNext}`,
                history: [...prevState.history, "neg(" + prevState.inputValue + ")=" + `${termNext}` + "\n"]
            }
        })
    }

    function handleFacultyOperation() {
        setCalculatorState(prevState => {
            const termNext = operationService.Factorial(prevState.term[prevState.term.length - 1] as number)
            let inputNext = ""
            for (let i = prevState.inputValue.length - 1; !Number.isNaN(+prevState.inputValue[i]); i--) {
                inputNext = prevState.inputValue.slice(0, i)
            }
            return {
                ...prevState,
                term: [...prevState.term.slice(0, -1), termNext],
                inputValue: inputNext + `${termNext}`,
                history: [...prevState.history, "fact(" + prevState.inputValue + ")=" + `${termNext}` + "\n"]
            }
        })
    }

    function handleLogOperation() {
        setCalculatorState(prevState => {
            const termNext = operationService.calculateLog(prevState.term[prevState.term.length - 1] as number)
            let inputNext = ""
            for (let i = prevState.inputValue.length - 1; !Number.isNaN(+prevState.inputValue[i]); i--) {
                inputNext = prevState.inputValue.slice(0, i)
            }
            return {
                ...prevState,
                term: [...prevState.term.slice(0, -1), termNext],
                inputValue: inputNext + `${termNext}`,
                history: [...prevState.history, "log(" + prevState.inputValue + ")=" + `${termNext}` + "\n"]
            }
        })
    }

    function handleLnOperation() {
        setCalculatorState(prevState => {
            const termNext = operationService.calculateLn(prevState.term[prevState.term.length - 1] as number)
            let inputNext = ""
            for (let i = prevState.inputValue.length - 1; !Number.isNaN(+prevState.inputValue[i]); i--) {
                inputNext = prevState.inputValue.slice(0, i)
            }
            return {
                ...prevState,
                term: [...prevState.term.slice(0, -1), termNext],
                inputValue: inputNext + `${termNext}`,
                history: [...prevState.history, "ln(" + prevState.inputValue + ")=" + `${termNext}` + "\n"]
            }
        })
    }

    function handleOneDevidedByOperation() {
        setCalculatorState(prevState => {
            const termNext = operationService.calculateOneDividedBy(prevState.term[prevState.term.length - 1] as number)
            let inputNext = ""
            for (let i = prevState.inputValue.length - 1; !Number.isNaN(+prevState.inputValue[i]); i--) {
                inputNext = prevState.inputValue.slice(0, i)
            }
            return {
                ...prevState,
                term: [...prevState.term.slice(0, -1), termNext],
                inputValue: inputNext + `${termNext}`,
                history: [...prevState.history, "1 / " + prevState.inputValue + " =" + `${termNext}` + "\n"]
            }
        })
    }

    function handleTakeAbsOperation() {
        setCalculatorState(prevState => {
            const termNext = operationService.takeAbs(prevState.term[prevState.term.length - 1] as number)
            let inputNext = ""
            for (let i = prevState.inputValue.length - 1; !Number.isNaN(+prevState.inputValue[i]); i--) {
                inputNext = prevState.inputValue.slice(0, i)
            }
            return {
                ...prevState,
                term: [...prevState.term.slice(0, -1), termNext],
                inputValue: inputNext + `${termNext}`,
                history: [...prevState.history, "abs(" + prevState.inputValue + ") =" + `${termNext}` + "\n"]
            }
        })
    }

    // @formatter:off
    const object: (CalculatorButtonAction)[][] = [
        [
            { id:0, label: "functions", action:()=>{ console.log("Reset") } },
            { id:1, class: "bx bx-pi font-bold", action:()=>{ handleAddDigit(pi) } },
            { id:2, label: "e", action:()=>{ handleAddDigit(eulerNumber) } },
            { id:3, label: "Reset", action:()=>{ handleResetInput() } },
            { id:4, class: "pi pi-delete-left", action:()=>{ handleDeleteToken() } },
        ],
        [
            { id:0, label: "x²", action:()=>{ console.log("emtpy") } },
            { id:1, label: "⅟x", action:()=>{ handleOneDevidedByOperation() } },
            { id:2, label: "|x|", action:()=>{ handleTakeAbsOperation() } },
            { id:3, label: "exp", action:()=>{ console.log("Reset") } },
            { id:4, label: "mod", action:()=>{ handleAddOperation(Operation.Percentage) } },
        ],
        [
            { id:0, class: "bx bx-square-root font-bold", action:()=>{ console.log("emtpy") } },
            { id:1, label: "(", action:()=>{ console.log("emtpy") } },
            { id:2, label: ")", action:()=>{ console.log("emtpy") } },
            { id:3, label: "n!", action:()=>{ handleFacultyOperation() } },
            { id:4, class: "bx bx-division font-bold", action:()=>{ handleAddOperation(Operation.Division) } },
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
            { id:0, label: "log", action:()=>{ handleLogOperation() } },
            { id:1, label: "1", action:()=>{ handleAddDigit(1) } },
            { id:2, label: "2", action:()=>{ handleAddDigit(2) } },
            { id:3, label: "3", action:()=>{ handleAddDigit(3) } },
            { id:4, class: "pi pi-plus", action:()=>{ handleAddOperation(Operation.Plus) } },
        ],
        [
            { id:0, label: "ln", action:()=>{ handleLnOperation() } },
            { id:1, class: "bx bx-math-alt font-bold", action:()=>{ handleNegateOperation() } },
            { id:2, label: "0", action:()=>{ handleAddDigit(0) } },
            { id:3, label: ".", action:()=>{ console.log("Reset") } },
            { id:4, class: "pi pi-equals", action:()=>{ handleEqualsOperation() } },
        ],
    ];
    // @formatter:on
    return (
        <>
            <h1>Welcome to our Calculator Page.</h1>
            <p>Here you can use different calculation from normal Operation to high Operation and so on.</p>
            <Card>
                <div className={"flex flex-column"}>
                    <InputText className="mb-6 text-4xl" placeholder="" value={calculatorState.inputValue}
                               onChange={
                                   (e) => setCalculatorState(prevState => {
                                       return {
                                           ...prevState,
                                           inputValue: e.target.value,
                                       }
                                   })
                               }/>
                </div>
                <Button rounded={false} severity="success" label={"Verifiy"} className={"mb-4"} onClick={() => {
                    console.log(`inputValue: ${calculatorState.inputValue}; term: ${calculatorState.term};`)
                }}></Button>
                <Button rounded={false} severity="success" label={"TestEval"} className={"mb-4"} onClick={() => {
                    const word = "eln(3)"
                    const cursor = {
                        index: 0
                    }
                    console.log(helperService.parseStringToArrayTerm(word,cursor))
                }}></Button>
                {
                    object.map((item, index) => (
                        <CalculatorGrid key={index} calculatorButtonAction={item}></CalculatorGrid>
                    ))
                }
            </Card>
            <Card header={"Verlauf"} className={"text-4xl md:w-25rem"}>
                {calculatorState.history}
            </Card>
        </>
    )
}