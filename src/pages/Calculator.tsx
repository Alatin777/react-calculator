import type {CalculatorButtonAction} from "../models/CalculatorButtonAction.ts";
import {Card} from "primereact/card";
import {InputText} from "primereact/inputtext";
import {OperationService} from "../services/OperationService.ts";
import type {CalculatorState} from "../models/CalculatorState.ts";
import {Operation, type OperationValue} from "../shared/types/Operation.ts";
import {Fragment, useState} from "react";
import {ParserService} from "../services/ParserService.ts";
import {FlexGridCalculator} from "../components/FlexGridCalculator.tsx";
import {ScrollPanel} from "primereact/scrollpanel";
import {Tooltip} from "primereact/tooltip";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import * as React from "react";

const operationService = new OperationService(new ParserService());

export function Calculator() {
    const [calculatorState, setCalculatorState] = useState<CalculatorState>({
        inputValue: "",
        history: [],
    });
    const [visible, setVisible] = useState(false);
    const eulerNumber: number = Math.E
    const pi: number = Math.PI
    const onKeyDown = (event: React.KeyboardEvent) => {
        switch (event.key) {
            case "Enter":
                handleEqualsOperation();
                break;
            case "e":
                handleAddDigit(eulerNumber);
                break;
            case "s":
                addSinFunctions();
                break;
            case "p":
                handleAddDigit(pi);
                break;
        }
    };
    const cleanHistory = () => {
        setCalculatorState(prevState => {
            return {...prevState, history: [""]}
        })
    }

    const handleDeleteToken = () => {
        setCalculatorState(prevState => {
            return operationService.deleteToken(prevState)
        })
    }

    const handleAddDigit = (digit: number) => {
        setCalculatorState(prevState => {
            return operationService.addDigit(prevState, digit)
        })
    }

    const handleAddOperation = (operation: OperationValue) => {
        setCalculatorState(prevState => {
            return operationService.addOperation(prevState, operation)
        })
    }

    const addLeftParenthesis = () => {
        setCalculatorState(prevState => {
            return {
                ...prevState,
                inputValue: prevState.inputValue + "("
            }
        })
    }

    const addRightParenthesis = () => {
        setCalculatorState(prevState => {
            return {
                ...prevState,
                inputValue: prevState.inputValue + ")"
            }
        })
    }

    const addSinFunctions = () => {
        setCalculatorState(prevState => {
            return {
                ...prevState,
                inputValue: prevState.inputValue + "sin()"
            }
        })
    }

    const addPowFunctions = () => {
        setCalculatorState(prevState => {
            return {
                ...prevState,
                inputValue: prevState.inputValue + "pow(,)"
            }
        })
    }

    const handleResetInput = () => {
        setCalculatorState(operationService.resetInput(calculatorState.history))
    }

    const handleEqualsOperation = () => {
        setCalculatorState(prevState => {
            if (prevState.inputValue.length === 0) {
                return prevState;
            }
            return {
                ...prevState,
                inputValue: `${operationService.evaluateParsedValue(prevState)}`,
                history: [...prevState.history, prevState.inputValue + `= ${operationService.evaluateParsedValue(prevState)}`]
            }
        })
    }

    const handleNegateOperation = () => {
        setCalculatorState(operationService.negateNumber(calculatorState))
    }

    const handleFacultyOperation = () => {
        setCalculatorState(operationService.evaluateFactorial(calculatorState))
    }

    const handleLogOperation = () => {
        setCalculatorState(operationService.evaluateLog(calculatorState))
    }

    const handleLnOperation = () => {
        setCalculatorState(operationService.evaluateLn(calculatorState))
    }

    const handleOneDevidedByOperation = () => {
        setCalculatorState(operationService.evaluateOneDividedBy(calculatorState))
    }

    const handleTakeAbsOperation = () => {
        setCalculatorState(operationService.takeAbs(calculatorState))
    }

    // @formatter:off
    const object: (CalculatorButtonAction)[][] = [
        [
            { id:0, severity:"secondary", label: "func", action:()=>{ setVisible(true) } },
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
            { id:1, severity:"secondary", label: "(", action:()=>{ addLeftParenthesis() } },
            { id:2, severity:"secondary", label: ")", action:()=>{ addRightParenthesis() } },
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
            { id:0, severity:"secondary", label: "10^x", action:()=>{ addPowFunctions() } },
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
            <Button label={"Verifiy"} onClick={
                () => {
                    console.log("InputValue:", calculatorState.inputValue)
                }
            }/>
            <div className={"flex flex-row gap-2 justify-center"}>
                <Card className="w-4 bg-gray-900">
                    <div className={"flex flex-column"}>
                        <InputText className="mb-3 text-4xl" placeholder="" value={calculatorState.inputValue}
                                   onKeyDown={onKeyDown}
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
                <Card title={"Calculation History"} className={"bg-gray-900 text-4xl text-gray-50"}>
                    <Tooltip target={".info-icon"} content={"You can scroll vertical and horizontal in the History"}/>
                    <ScrollPanel className={"text-2xl md:w-26rem w-full h-22rem"}>
                        {calculatorState.history.map((term, index) => (
                            <Fragment key={index}>
                                {term}
                                <br/>
                            </Fragment>
                        ))}
                    </ScrollPanel>
                    <Button severity={"danger"} label={"Clean History"} onClick={() => {
                        cleanHistory()
                    }}/>
                </Card>
            </div>
            <Dialog header="Functions" draggable={false} visible={visible}
                    headerClassName={"bg-gray-900 text-gray-50"} contentClassName={"bg-gray-900 flex flex-column gap-2"}
                    onHide={() => {
                        if (!visible) return;
                        setVisible(false);
                    }}
            >
                <div className={"flex gap-2"}>
                    <Button label={"sin"} onClick={() => {
                        addSinFunctions()
                    }} severity={"secondary"}/>
                    <Button label={"cos"} onClick={() => {
                    }} severity={"secondary"}/>
                    <Button label={"tan"} onClick={() => {
                    }} severity={"secondary"}/>
                </div>
                <div className={"flex gap-2"}>
                    <Button label={"sin^-1"} onClick={() => {
                    }} severity={"secondary"}/>
                    <Button label={"cos^-1"} onClick={() => {
                    }} severity={"secondary"}/>
                    <Button label={"tan^-1"} onClick={() => {
                    }} severity={"secondary"}/>
                </div>
                <div className={"flex gap-2"}>
                    <Button label={"e^x"} onClick={() => {
                    }} severity={"secondary"}/>
                    <Button label={"%"} onClick={() => {
                    }} severity={"secondary"}/>
                </div>
            </Dialog>
        </>
    )
}