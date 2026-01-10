import {createBrowserRouter} from 'react-router-dom'
import MainLayout from "./layouts/MainLayout.tsx";
// import Calculator from "./pages/Calculator.tsx";
import {Calculator} from "./pages/Calculator.tsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '',
                element: <Calculator />
            }
        ]
    }
])