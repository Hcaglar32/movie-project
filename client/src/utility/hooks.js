import { useState } from "react";

export const useForm=(callback,initialState={})=>{
    const [values,SetValues] = useState(initialState);

    const onChange=(event)=>{
        SetValues({...values,[event.target.name]:event.target.value});
        console.log(values);
    }

    const onSubmit = (event)=>{
        event.preventDefault();
        callback();
    }
    return{
        onChange,
        onSubmit,
        values
    }
}