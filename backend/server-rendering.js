// Import necessary modules and dependencies
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Login from '../src/components/login/login'; // Import your LoginPage component

const renderLoginPage = () => {
  // Render the LoginPage component to HTML
  const html = ReactDOMServer.renderToString(<Login />);

  // You might want to wrap the HTML in a template or include additional data
  const fullHtml = `<html><body>${html}</body></html>`;

  return fullHtml;
};

export default renderLoginPage;