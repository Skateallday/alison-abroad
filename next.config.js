module.exports = {
    webpack: (config) => {
      // Add a fallback for the 'path' module
      config.resolve.fallback = {
        path: require.resolve('path-browserify'),
      };
      
      return config;
    },
  };