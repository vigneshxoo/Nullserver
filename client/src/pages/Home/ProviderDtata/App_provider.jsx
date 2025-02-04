import React from 'react'
import { Provider } from './Providing'
import App from '../../../App'
import { Routes } from 'react-router-dom'

export const App_provider = () => {
    return (
        <Provider>
            <App />
        </Provider>
    )
}
