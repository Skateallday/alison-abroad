import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import config from '../../config';

interface LoginState {
  username: string;
  password: string;
  loggedIn: boolean;
  loading: boolean;
  error: string | null;
}

const Login: React.FC = () => {
  const [state, setState] = useState<LoginState>({
    username: '',
    password: '',
    loggedIn: false,
    loading: false,
    error: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState((prevState) => ({ ...prevState, loading: true, error: null }));

    try {
      const { username, password } = state;
      const response = await axios.post(
        `${config.apiUrl}/users/login`,
        { username, password },
        { withCredentials: true }
      );
      setState((prevState) => ({
        ...prevState,
        loggedIn: true,
        loading: false,
      }));
      alert('Logged in successfully');
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        loading: false,
        error: 'Login failed. Please try again.',
      }));
      console.error(error);
    }
  };

  if (state.loggedIn) {
    return <Navigate to="/create-image" />;
  }

  return (
    <div className="bg-indigo-500 pt-5 min-h-screen">
      <div className="flex justify-center">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="flex justify-center">
            <img
              alt="Logo"
              className="h-14 w-14"
              src="https://ik.imagekit.io/pibjyepn7p9/Lilac_Navy_Simple_Line_Business_Logo_CGktk8RHK.png"
            />
          </div>
          <h3>Welcome back Alison</h3>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Username:
              </label>
              <input
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="username"
                value={state.username}
                onChange={handleInputChange}
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
                name="password"
                value={state.password}
                onChange={handleInputChange}
              />
            </div>
            {state.error && <p className="text-red-500">{state.error}</p>}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                disabled={state.loading}
              >
                {state.loading ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
