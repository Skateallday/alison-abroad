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

export default class ImagesList extends Component {
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
      return <GalleryImages {...currentImage} key={currentImage._id} />;
    });
  }

  render() {
    return (
      <div>
        <h3>Logged images</h3>
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
                  <img src={currentImage.src} width={currentImage.width} height={currentImage.height} />
                  
                </td>
                <td>{currentImage.country}</td>
                <td>{currentImage.subregion}</td>
                <td>{currentImage.caption}</td>
              </tr>
            )
          })}
        </tbody>
        </table>
      </div>
    )
  }
}