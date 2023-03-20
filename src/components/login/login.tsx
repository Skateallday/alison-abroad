import React, { Component } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';



export default class Login extends Component <any, any> {
    constructor (props: any){
        super(props);

        this.state = {
            username : String,
            password : String,
            loggedIn : false
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeUsername(e: React.ChangeEvent<any>) {
        this.setState({
            username: e.target.value
        });
    }
    onChangePassword(e: React.ChangeEvent<any>) {
        this.setState({
            password: e.target.value
        });
    }

    onSubmit(e: React.ChangeEvent<any>) {
        e.preventDefault();
        const data = {
            username: this.state.username,
            password: this.state.password
        };
        console.log(data);
    
        axios
            .post('http://localhost:5000/users/login', data)
            .then(res => {
                console.log(res.data);
                this.setState({loggedIn : true})
                alert("Logged In Successfully")
            })
            .catch(error => {
                console.error(error);
                alert("Login Failed. Please try again.");
            });
    }

  render() {
    if (this.state.loggedIn === true ) {
        return <Navigate to = {{ pathname: "/create-image" }} />;

    }
    return (

      <div>

        <div className="bg-indigo-500 pt-5 min-h-screen">
        <div className="flex justify-center">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="flex justify-center">
                <img 
                    alt=""
                    className="h-14 w-14"
                    src="https://ik.imagekit.io/pibjyepn7p9/Lilac_Navy_Simple_Line_Business_Logo_CGktk8RHK.png?ik-sdk-version=javascript-1.4.3&updatedAt=1649962071315"/>
            </div> 
        
            <h3>Welcome back Alison</h3>

       
        <form 
            onSubmit={this.onSubmit} 
            encType='multipart/form-data'>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                    Username:
                    </label>
                    <input 
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        type="text" 
                        name='username'
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                    Password:
                    </label>
                    <input 
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        type="password" 
                        name='password'
                        value={this.state.password}
                        onChange={this.onChangePassword}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <input 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                        type="submit"
                        value="Login"
                        />
                </div>
            </form>
            </div>
            </div>      
        
      </div>
      </div>
    )
  }
}