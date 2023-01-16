import React, { ChangeEvent, HTMLProps } from "react";

interface Props extends HTMLProps<HTMLFormElement>{
    onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
    inputValue: string;
}

const WriteBlog = ({onInputChange, inputValue, ...props}: Props) => {
    return (
        <div className="p-10">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" {...props}>
            <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            placeholder="What would you like to say?"
            onChange={onInputChange}
            value={inputValue}
            />
            <br/>
        </form>
        <button disabled={!inputValue} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">Create</button>

        </div>

    );
};

export default WriteBlog;