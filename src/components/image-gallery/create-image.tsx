import React, { useState } from "react";
import SingleImage from "./single-image";
import MultiImage from "./multi-image";
import EditImage from "./edit-image";

const CreateImage = () => {
  const [isForm, setIsForm] = useState("Single");

  const handleSingleClick = () => {
    setIsForm("Single");
  };

  const handleMultiClick = () => {
    setIsForm("Multi");
  };

  const handleEditClick = () => {
    setIsForm("Edit");
  };

  return (
    <div>
    <div className="p-4">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSingleClick}>Single Image</button>
      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleMultiClick}>Multiple Images</button>
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleEditClick}>Edit Images</button>

    </div>
      {isForm === "Single" ? <SingleImage /> : isForm === "Multi" ? <MultiImage /> : <EditImage />}
    </div>
  );
};

export default CreateImage;
