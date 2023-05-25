import React from "react";
import { createContext, useState } from "react";

const LogContext = createContext();

export function LogContextProvider({children}) {
    const [text, setText] = useState('');
    return (
        <LogContextProvider value={{text, setText}}>
            {children}
        </LogContextProvider>
    );
}

export default LogContext;