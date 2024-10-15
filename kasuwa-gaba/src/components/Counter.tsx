import { useReducer, ReactNode, useState, Children } from "react";


type ChildrenType = {
    children: (num: number) => ReactNode
}

const Counter = ( {children} : ChildrenType) => {
    const [count, setCount] = useState<number>(1)

    const increment = () => setCount(prev => prev + 1)
    const decrement = () => setCount(prev => prev - 1)

    return (
        <>
            <h3>Counter is: {children(count)}</h3>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>

        </>
    )
}

export default Counter