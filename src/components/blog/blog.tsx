import React, {useState, FormEvent, ChangeEvent} from "react";
import WriteList from "../writeBlog/writeList";
import TodoForm from "../writeBlog/writeBlog";
import { Write } from "../interfaces/Write";

const App = () => {
    const [writes, setWrites] = useState<Array<Write>>([]);
    const [writeValue, setWriteValue] = useState("");
    

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setWrites((previousWrites) => [
            ...previousWrites,
            {
                task: writeValue,
                finished: false,
            },
        ]);

        setWriteValue("");
};
    
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setWriteValue(event.currentTarget.value);
    };

    const clearForm = ()=> {
        setWrites((previousWrites)=>[]);
               
        
    }
        

    return (
        <div className="App-header ">
        <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="justify-center text-left p-10"> 
        <h1>Welcome to my Blog</h1>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni minus repellendus labore natus ut, sint accusantium similique sit nulla molestias perspiciatis non minima repudiandae sequi omnis maxime aspernatur maiores earum.</p>
       </div>
       <div>
            

       <h2>To Do</h2>
        <WriteList writes={writes} />

        <h2>Done</h2>
        
        <h2>Add More</h2>
        <TodoForm 
            onSubmit={handleSubmit}
            onInputChange={handleChange}
            inputValue={writeValue} />
            <br/>
        <button className="btn btn-danger" onClick={clearForm}>Clear</button>
       </div>
       </div>
       </div>
 


    );
};

export default App;