import type {CalculatorButtonAction} from "../models/CalculatorButtonAction.ts";
import {Card} from "primereact/card";
import {InputText} from "primereact/inputtext";
import {OperationService} from "../services/OperationService.ts";
import type {CalculatorState} from "../models/CalculatorState.ts";
import {Operation, type OperationValue} from "../shared/types/Operation.ts";
import {useState} from "react";
// import {ParserService} from "../services/ParserService.ts";
import {FlexGridCalculator} from "../components/FlexGridCalculator.tsx";
import {ScrollPanel} from "primereact/scrollpanel";

const operationService = new OperationService();

// const helperService = new ParserService();

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
        setCalculatorState(operationService.resetInput(calculatorState.history))
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
            { id:0, severity:"secondary", label: "func", action:()=>{ console.log("Reset") } },
            { id:1, severity:"secondary", class: "bx bx-pi font-bold h-full", action:()=>{ handleAddDigit(pi) } },
            { id:2, severity:"secondary", label: "e", action:()=>{ handleAddDigit(eulerNumber) } },
            { id:3, severity:"danger", label: "Reset", action:()=>{ handleResetInput() } },
            { id:4, severity:"warning", class: "pi pi-delete-left h-full", action:()=>{ handleDeleteToken() } },
        ],
        [
            { id:0, severity:"secondary", label: "x²", action:()=>{ console.log("empty") } },
            { id:1, severity:"secondary", label: "⅟x", action:()=>{ handleOneDevidedByOperation() } },
            { id:2, severity:"secondary", label: "|x|", action:()=>{ handleTakeAbsOperation() } },
            { id:3, severity:"secondary", label: "exp", action:()=>{ console.log("Reset") } },
            { id:4, severity:"secondary", label: "mod", action:()=>{ handleAddOperation(Operation.Percentage) } },
        ],
        [
            { id:0, severity:"secondary", class: "bx bx-square-root font-bold h-full", action:()=>{ console.log("empty") } },
            { id:1, severity:"secondary", label: "(", action:()=>{ console.log("empty") } },
            { id:2, severity:"secondary", label: ")", action:()=>{ console.log("empty") } },
            { id:3, severity:"secondary", label: "n!", action:()=>{ handleFacultyOperation() } },
            { id:4, severity:"secondary", class: "bx bx-division font-bold h-full", action:()=>{ handleAddOperation(Operation.Division) } },
        ],
        [
            { id:0, severity:"secondary", label: "x^y", action:()=>{ console.log("empty") } },
            { id:1, severity:"secondary", label: "7", action:()=>{ handleAddDigit(7) } },
            { id:2, severity:"secondary", label: "8", action:()=>{ handleAddDigit(8) } },
            { id:3, severity:"secondary", label: "9", action:()=>{ handleAddDigit(9) } },
            { id:4, severity:"secondary", class: "pi pi-times h-full", action:()=>{ handleAddOperation(Operation.Multiplication) } },
        ],
        [
            { id:0, severity:"secondary", label: "10^x", action:()=>{ console.log("empty") } },
            { id:1, severity:"secondary", label: "4", action:()=>{ handleAddDigit(4) } },
            { id:2, severity:"secondary", label: "5", action:()=>{ handleAddDigit(5) } },
            { id:3, severity:"secondary", class:"", label: "6", action:()=>{ handleAddDigit(6) } },
            { id:4, severity:"secondary", class: "pi pi-minus h-full", action:()=>{ handleAddOperation(Operation.Minus) } },
        ],
        [
            { id:0, severity:"secondary", label: "log", action:()=>{ handleLogOperation() } },
            { id:1, severity:"secondary", label: "1", action:()=>{ handleAddDigit(1) } },
            { id:2, severity:"secondary", label: "2", action:()=>{ handleAddDigit(2) } },
            { id:3, severity:"secondary", label: "3", action:()=>{ handleAddDigit(3) } },
            { id:4, severity:"secondary", class: "pi pi-plus h-full", action:()=>{ handleAddOperation(Operation.Plus) } },
        ],
        [
            { id:0, severity:"secondary", label: "ln", action:()=>{ handleLnOperation() } },
            { id:1, severity:"secondary", class: "bx bx-math-alt font-bold h-full", action:()=>{ handleNegateOperation() } },
            { id:2, severity:"secondary", label: "0", action:()=>{ handleAddDigit(0) } },
            { id:3, severity:"secondary", label: ".", action:()=>{ console.log("Reset") } },
            { id:4, severity:"success", class: "pi pi-equals h-full", action:()=>{ handleEqualsOperation() } },
        ],
    ];
    // @formatter:on
    return (
        <>
            <h1>Welcome to our Calculator Page.</h1>
            <p>Here you can use different calculation from normal Operation to high Operation and so on.</p>
            <div className={"flex flex-row gap-2 justify-center"}>
                <Card className="w-4 bg-gray-900">
                    <div className={"flex flex-column"}>
                        <InputText className="mb-3 text-4xl" placeholder="" value={calculatorState.inputValue}
                                   onChange={
                                       (e) => setCalculatorState(prevState => {
                                           return {
                                               ...prevState,
                                               inputValue: e.target.value,
                                           }
                                       })
                                   }/>
                    </div>
                    {
                        object.map((item, index) => (
                            <FlexGridCalculator key={index} calculatorButtonAction={item}></FlexGridCalculator>
                        ))
                    }
                </Card>
                <Card header={"Verlauf"} className={"bg-gray-900 text-4xl text-gray-50"}>
                    <ScrollPanel className={"text-4xl md:w-26rem w-full h-25rem"}>
                        {calculatorState.history}
                    </ScrollPanel>
                </Card>
            </div>
        </>
    )
}