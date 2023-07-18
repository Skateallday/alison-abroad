import React, { Component } from 'react';
import axios from 'axios';
import { ImagesProps } from '../interfaces/images';

const GalleryImages = (props: ImagesProps) => (
  <tr>
    <td>{props.src}</td>
    <td>{props.width}</td>
    <td>{props.height}</td>
    <td>{props.country}</td>
    <td>{props.subregion}</td>
    <td>{props.caption}</td>
  </tr>
)

interface State {
  galleries: ImagesProps[];
}

export default class EditImage extends Component {
  state: State = {
    galleries: []
  };

  componentDidMount() {
    axios.get('http://localhost:5000/images/')
      .then(response => {
        this.setState({ galleries: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  imageList() {
    return this.state.galleries.map((currentImage: ImagesProps) => {
      const imageUrl = `http://localhost:5000/${currentImage.src}`; // Adjust the URL based on your server configuration
      return <GalleryImages {...currentImage} src={imageUrl} key={currentImage._id} />;
    });
  }

  render() {
    return (
      <div className="bg-indigo-500 pt-5 min-h-screen">
          <div className="flex justify-center">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <h3 className="text-2xl font-bold text-gray-700 mb-4">
        Edit images</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Source</th>
              <th>Country</th>
              <th>Subregion</th>
              <th>Caption</th>
            </tr>
          </thead>
          <tbody>
          { this.imageList().map(image => {
            const currentImage = image.props;
            return (
              <tr key={currentImage._id}>
                <td>
                  <img alt="Edit Images" className="object-scale-down h-48 w-96" src={currentImage.src} />

                </td>
                <td><input type="text" placeholder={currentImage.country}/></td>
                <td><input type="text" placeholder={currentImage.subregion}/></td>                
                <td><input type="text" placeholder={currentImage.caption}/></td>
                <td><button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Save changes</button> </td>
                
              </tr>
            )
          })}
        </tbody>
        </table>
      </div>
      </div>
      </div>
    )
  }
}