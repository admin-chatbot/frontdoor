import React, { useState } from "react";
import Counter from "./Counter";


type counterType = {
    counter1: number;
   
}

let counter1 = 0;
const increaseCounterinParent = () => {
    
    counter1 = counter1+1;
    console.log("inside increase counter parent function", {counter1})
}
const StateVariable = () => {
    console.log("Starting state component")

    
    return (
        
            <Counter counter1={counter1} increaseCounter={increaseCounterinParent} />

    )

}
export default StateVariable;