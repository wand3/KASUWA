import React, { createContext, useContext, useCallback, useMemo } from 'react';
import KasuwaApiClient from "../KasuwaApiClient";

export const ApiContext = createContext<KasuwaApiClient | null>(null)

export function ApiProvider({ children, onError }: React.PropsWithChildren<{ onError?: (error: any) => void; }>) {
    
    const api = useMemo(() => new KasuwaApiClient(onError), [onError]);
    return (
        <ApiContext.Provider value={api}>
            {children}
        </ApiContext.Provider>
    
    )

}

export default ApiProvider;