import React, { useState } from "react";

const Counter = (props: { counter1: any; increaseCounter: any}) => {
    console.log("starting counter component properties passed",props)
    let counter2 = props.counter1;
    const increaseCounter = props.increaseCounter;
    const [counter,setCounter] = useState(0);
    const incrementCounter = () => {
        setCounter(counter+1)
        counter2 =counter2+1;
        increaseCounter();
        increaseCounterinChild();
        console.log("state counter value"+counter+"local constant value"+counter2);
    }
    return (
        <>
            <div className="flex flex-col items-center">{counter}</div>
            <button style={{ width: '100%' }} onClick={incrementCounter}>
                Increase Counter
            </button>

        </>
    )
}

let counter3 =0;
const increaseCounterinChild = () => {
    
    counter3 = counter3+1;
    console.log("inside increase counter child function", {counter3})
}

export default Counter;