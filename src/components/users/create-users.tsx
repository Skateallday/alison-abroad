import axios from 'axios';
import React, { Component } from 'react';
import config from '../../config';


export default class CreateUser extends Component<any, any> {
    constructor(props: any){
        super(props)
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: String
        };
    }

    onChangeUsername(e: React.ChangeEvent<any>){
        this.setState({
            username: e.target.value
        });
    }

    onSubmit(e: React.ChangeEvent<any>){
        e.preventDefault();

        const newUser = {
            username: this.state.username,
        };

        console.log(newUser);

        axios.post(`${config.apiUrl}/users/add`, newUser)
        .then(res => console.log(res.data));

        this.setState({
            username: ''
        })

    }
  render() {
    return (
        <div className="w-full max-w-xs">
            <h3>Create New User</h3>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={this.onSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                    Username:
                    </label>
                    <input 
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        type="text" 
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <input 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                        type="submit"
                        value="Create User"
                        />
                </div>
            </form>
      </div>
    )
  }
}