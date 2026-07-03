import React, { useState } from "react";
import axios from "axios";
import config from '../../config';
import { ToastPosition, toast } from 'react-toastify';
import europeanCountries from "../../data/europeanCountries";
import europeanCities from "../../data/europeanCities";
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
  width: 0,
  height: 0,
  country: "",
  subregion: "",
  caption: "",
  message: "",
  messageType: "",
};

export default function SingleImage() {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData(initialState);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const capitalizedCountry = formData.country.charAt(0).toUpperCase() + formData.country.slice(1);

    const data = new FormData();
    const fileInput = (e.target as HTMLFormElement).elements.namedItem("src") as HTMLInputElement;
    if (fileInput?.files?.[0]) {
      data.append("src", fileInput.files[0]);
    }
    data.append("width", String(formData.width));
    data.append("height", String(formData.height));
    data.append("country", capitalizedCountry);
    data.append("subregion", formData.subregion);
    data.append("caption", formData.caption);

    axios.post(`${config.apiUrl}/images/add`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then(() => {
      toast.success('Image uploaded successfully', { position: "top-right" as ToastPosition });
      handleReset();
    })
    .catch((error: unknown) => {
      toast.error("There was an error uploading the image.", { position: "top-right" as ToastPosition });
      console.error(error);
      setFormData(prev => ({ ...prev, message: "There was an error uploading the image.", messageType: "error" }));
    });
  };

  return (
    <div>
      <div className="bg-indigo-500 pt-5 min-h-screen">
        <div className="flex justify-center">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h3 className="text-2xl font-bold text-gray-700 mb-4">Upload Single Image</h3>

            {formData.message && (
              <div className={`${formData.messageType === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} p-4 mb-4 rounded-md`}>
                {formData.message}
              </div>
            )}

            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit} encType="multipart/form-data">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Source:</label>
                <input
                  required
                  className="bg-transparent hover:bg-blue-500 hover:text-white text-blue-700 font-semibold py-2 px-4 border border-blue-500 rounded cursor-pointer"
                  type="file"
                  id="src"
                  name="src"
                  accept=".png, .jpg, .jpeg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Width:</label>
                <input required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="width" value={formData.width} onChange={handleChange} />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Height:</label>
                <input required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="height" value={formData.height} onChange={handleChange} />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Country:</label>
                <input required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" list="european-countries" name="country" value={formData.country} onChange={handleChange} />
                <datalist id="european-countries">
                  {europeanCountries.map(country => <option key={country} value={country} />)}
                </datalist>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Region:</label>
                <input required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" list="european-cities" name="subregion" value={formData.subregion} onChange={handleChange} />
                <datalist id="european-cities">
                  {(europeanCities[formData.country] || []).map(city=>(
                    <option key={city} value={city} />
                  ))}
                </datalist>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Caption:</label>
                <input required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="caption" value={formData.caption} onChange={handleChange} />
              </div>
              <div className="flex items-center justify-between">
                <input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" value="Create New Image" />
                <button type="button" className="bg-red-500 hover:bg-red-700 py-2 px-4 rounded focus:outline-none focus:shadow-outline text-white" onClick={handleReset}>Reset</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}