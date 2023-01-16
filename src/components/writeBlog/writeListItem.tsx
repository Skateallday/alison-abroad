import React from "react";
import { Write } from "../interfaces/Write";

interface Props{
    write: Write;
}

const WriteListItem = ({write}: Props) => {
    return <li className="list-group-item">{write.task}</li>;
};

export default WriteListItem;