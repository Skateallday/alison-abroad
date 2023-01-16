import React from "react";
import WriteListItem from "./writeListItem";
import { Write } from "../interfaces/Write"

interface Props {
    writes: Write[];
}

const WriteList = ({writes}: Props) => {
    return (
        <ul className="list-group">
            {writes.map((write) => (
            <WriteListItem
                write={{
                    task: write.task,
                    finished: write.finished,
                }}
             />
            ))}
        </ul>
    );
};

export default WriteList;