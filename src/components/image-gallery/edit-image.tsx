import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ImagesProps } from '../interfaces/images';
import config from '../../config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS



const GalleryImage = (props: ImagesProps & { handleDeleteImage: (imageId: string) => void; EditImage: (imageId: string, caption: string, country: string, subregion: string) => void }) => {
  const [editedCountry, setEditedCountry] = useState(props.country);
  const [editedSubregion, setEditedSubregion] = useState(props.subregion);
  const [editedCaption, setEditedCaption] = useState(props.caption);

  return (
    <tr>
      <td>
        <img alt="Edit Images" className="object-scale-down h-48 w-96" src={`http://localhost:5000/${props.src}`} />
      </td>
      <td><input type="text" value={editedCountry} onChange={(e) => setEditedCountry(e.target.value)} /></td>
      <td><input type="text" value={editedSubregion} onChange={(e) => setEditedSubregion(e.target.value)} /></td>
      <td><input type="text" value={editedCaption} onChange={(e) => setEditedCaption(e.target.value)} /></td>
      <td>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => props.EditImage(props._id, editedCaption, editedCountry, editedSubregion)}>
          Save changes
        </button>
      </td>
      <td>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => props.handleDeleteImage(props._id)}>
          Delete image
        </button>
      </td>
    </tr>
  );
};

const EditImage = ({ galleries, setGalleries }: { galleries: ImagesProps[]; setGalleries: React.Dispatch<React.SetStateAction<ImagesProps[]>> }) => {

  const handleDeleteImage = (id: string) => {
    console.log('Image ID to delete:', id);
    const confirmed = window.confirm('Are you sure you want to delete this image?');
    console.log('User confirmed:', confirmed);
  
    if (confirmed) {
      axios
        .delete(`${config.apiUrl}/images/${id}`)
        .then((response) => {
          console.log('Image deleted successfully');
          // Show a success toast notification
          toast.success('Image deleted successfully', {
            position: toast.POSITION.TOP_RIGHT,
          });
  
          // You may want to update the galleries state here to reflect the deleted image.
          // For example, remove the deleted image from the state.
        })
        .catch((error) => {
          console.error('Error deleting image:', error.message);
        });
    }
  };

  const handleEditImage = (imageId: string, editedCaption: string, editedCountry: string, editedSubregion: string) => {
    // Implement the logic to update the image with the specified data.
    // You can make an API request to update the image data on the server.
    axios.put(`${config.apiUrl}/images/${imageId}`, {
      caption: editedCaption,
      country: editedCountry,
      subregion: editedSubregion,
    })
    .then((response) => {
      console.log('Image updated successfully');
      // You may want to update the state with the updated image data.
      // Show a success toast notification
      toast.success('Image updated successfully', {
      position: toast.POSITION.TOP_RIGHT, // You can choose a different position
    });
    })
    .catch((error) => {
      console.error('Error updating image:', error);
    });
  };

  return (
    <div className="bg-indigo-500 pt-5 min-h-screen">
      <div className="flex justify-center">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h3 className="text-2xl font-bold text-gray-700 mb-4">Edit images</h3>
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
              {galleries.map((image) => (
                <GalleryImage
                  {...image}
                  key={image._id}
                  EditImage={handleEditImage}
                  handleDeleteImage={handleDeleteImage}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const ParentComponent = () => {
  const [galleries, setGalleries] = useState<ImagesProps[]>([]);

  useEffect(() => {
    // Fetch image data when the component mounts
    axios.get(`${config.apiUrl}/images/`)
      .then((response) => {
        setGalleries(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return <EditImage galleries={galleries} setGalleries={setGalleries} />;
};

export default ParentComponent;
