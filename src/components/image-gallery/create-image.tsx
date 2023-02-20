import React, { Component } from 'react';
import { ImagesProps } from '../interfaces/images';
import axios from 'axios';



export default class CreateImage extends Component <any, any> {
    constructor (props: any){
        super(props);

        this.state = {
            src : String,
            width : Number,
            height: Number,
            country : String,
            subregion : String,
            caption : String
        }

        this.onChangeWidth = this.onChangeWidth.bind(this);
        this.onChangeHeight = this.onChangeHeight.bind(this);
        this.onChangeCountry = this.onChangeCountry.bind(this);
        this.onChangeSubregion = this.onChangeSubregion.bind(this);
        this.onChangeCaption = this.onChangeCaption.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({
            users: ['test user'],
            username: 'Jamfish'
        })
        
    }


    onChangeWidth(e: React.ChangeEvent<any>) {
        this.setState({
            width: parseInt(e.target.value)
        });
    }
    onChangeHeight(e: React.ChangeEvent<any>) {
        this.setState({
            height: parseInt(e.target.value)
        });
    }
    onChangeCountry(e: React.ChangeEvent<any>) {
        this.setState({
            country: e.target.value
        });
    }
    onChangeSubregion(e: React.ChangeEvent<any>) {
        this.setState({
            subregion: e.target.value
        });
    }
    onChangeCaption(e: React.ChangeEvent<any>) {
        this.setState({
            caption: e.target.value
        });
    }

    onSubmit(e: React.ChangeEvent<any>) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('width', this.state.width);
        formData.append('height', this.state.height);
        formData.append('country', this.state.country);
        formData.append('subregion', this.state.subregion);
        formData.append('caption', this.state.caption);

        axios
            .post('http://localhost:5000/images/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(res => console.log(res.data));
    }

  render() {
    return (
      <div>
        <h3> Create New Image</h3>

        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" 
            onSubmit={this.onSubmit} 
            encType='multipart/form-data'>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                    Source:
                    </label>
                    <input 
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        type="file" 
                        name='src'
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
                        name='width'
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
                        name='height'
                        value={this.state.height}
                        onChange={this.onChangeHeight}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                    Country:
                    </label>
                    <input 
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        type="text" 
                        value={this.state.country}
                        onChange={this.onChangeCountry}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                    Region:
                    </label>
                    <input 
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        type="text" 
                        name='subregion'
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
                        name='caption'
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
                </div>
            </form>
        
        
      </div>
    )
  }
}