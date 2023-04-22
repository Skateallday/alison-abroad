import React, { Component } from "react";
import axios from "axios";

export default class CreateImage extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      src: String,
      width: Number,
      height: Number,
      country: "",
      subregion: String,
      caption: String,
      message: "",
      messageType: "",
      countries: [], // initialize the countries state as an empty array
    };

    this.onChangeWidth = this.onChangeWidth.bind(this);
    this.onChangeHeight = this.onChangeHeight.bind(this);
    this.onChangeCountry = this.onChangeCountry.bind(this);
    this.onChangeSubregion = this.onChangeSubregion.bind(this);
    this.onChangeCaption = this.onChangeCaption.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/images")
      .then((response) => {
        const countriesArray = response.data
          .map((image: any) => image.country)
          .filter((country: string, index: number, array: string[]) => {
            // Only keep the first occurrence of the country
            return array.indexOf(country) === index;
          });
        this.setState({ countries: countriesArray });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeWidth(e: React.ChangeEvent<any>) {
    this.setState({
      width: parseInt(e.target.value),
    });
  }
  onChangeHeight(e: React.ChangeEvent<any>) {
    this.setState({
      height: parseInt(e.target.value),
    });
  }
  onChangeCountry(e: React.ChangeEvent<any>) {
    const { name, value } = e.target;

    if (name === "newCountryName") {
      this.setState({ newCountryName: value });
    } else if (name === "country") {
      if (value === "new-country") {
        this.setState({ country: value });
      } else if (this.state.countries.includes(value)) {
        this.setState({ country: value });
      } else {
        this.setState({ country: value, newCountryName: "" });
      }
    } else {
      this.setState({ [name]: value });
    }
  }
  onChangeSubregion(e: React.ChangeEvent<any>) {
    this.setState({
      subregion: e.target.value,
    });
  }
  onChangeCaption(e: React.ChangeEvent<any>) {
    this.setState({
      caption: e.target.value,
    });
  }

  handleReset = () => {
    this.setState({
      src: "",
      srcName: "",
      width: "",
      height: "",
      country: "",
      subregion: "",
      caption: "",
      message: "",
      messageType: "",
    });

    const formElement = document.getElementById("src") as HTMLFormElement;
  };

  onSubmit(e: React.ChangeEvent<any>) {
    e.preventDefault();
    
    const { country, newCountryName } = this.state;
    const countryName = country === "new-country" ? newCountryName : country;   
    const formData = new FormData();
    formData.append("src", e.target.elements.src.files[0]);
    formData.append("width", this.state.width);
    formData.append("height", this.state.height);
    formData.append("country", countryName);
    formData.append("subregion", this.state.subregion);
    formData.append("caption", this.state.caption);

    axios
      .post("http://localhost:5000/images/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        this.setState({
          message: "Image uploaded successfully!",
          messageType: "success",
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({
          message: "There was an error uploading the image.",
          messageType: "error",
        });
      });
  }

  render() {
    const { countries } = this.state;

    return (
      <div>
        <div className="bg-indigo-500 pt-5 min-h-screen">
          <div className="flex justify-center">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <h3 className="text-2xl font-bold text-gray-700 mb-4">
                Create New Image
              </h3>

              {this.state.message && (
                <div
                  className={`${
                    this.state.messageType === "success"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  } p-4 mb-4 rounded-md`}
                >
                  {this.state.message}
                </div>
              )}

              <form
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                onSubmit={this.onSubmit}
                encType="multipart/form-data"
              >
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Source:
                  </label>
                  <input
                    required
                    className="bg-transparent hover:bg-blue-500 hover:text-white text-blue-700 font-semibold py-2 px-4 border border-blue-500 rounded cursor-pointer"
                    type="file"
                    id="src"
                    name="src"
                    accept=".png, .jpg, .jpeg"
                    value={this.state.srcName}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Width:
                  </label>
                  <input
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="width"
                    value={this.state.width}
                    onChange={this.onChangeWidth}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Height:
                  </label>
                  <input
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="height"
                    value={this.state.height}
                    onChange={this.onChangeHeight}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Country:
                  </label>
                  <select
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="country"
                    value={this.state.country}
                    onChange={this.onChangeCountry}
                  >
                    <option value="">Select a country</option>
                    {countries.map((country: string) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                    <option value="new-country">Add a new country</option>
                  </select>

                  {this.state.country === "new-country" && (
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newCountryName">New country name:</label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="newCountryName"
                        value={this.state.newCountryName}
                        onChange={this.onChangeCountry}
                      />
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Region:
                  </label>
                  <input
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="subregion"
                    value={this.state.subregion}
                    onChange={this.onChangeSubregion}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Caption:
                  </label>
                  <input
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="caption"
                    value={this.state.caption}
                    onChange={this.onChangeCaption}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <input
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    value="Create New Image"
                  />
                  <button
                    type="button"
                    className="bg-red-500  hover:bg-red-700 py-2 px-4 rounded focus:outline-none focus:shadow-outline text-white"
                    onClick={this.handleReset}
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
