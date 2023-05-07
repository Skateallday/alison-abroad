import React, { useState, useEffect } from 'react';

interface Country {
  name: {
    common: string;
  };
}

export default function SearchCountries(props: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState<Country[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
        if (response.status === 404) {
          throw new Error('Country not found');
        }
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCountries(data);
        setError(null)
      } catch (error) {
        console.error('Error fetching countries:', error);
        setError(error as Error);
        setCountries([]);
      }
    }

    if (country) {
      fetchCountries();
    } else {
      setCountries([]);
    }
  }, [country]);

  const matchingCountries = countries.filter(Country => {
    const commonName = Country.name.common.toLowerCase();
    return commonName.includes(country.toLowerCase());
  });

  function handlecountryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCountry(event.target.value);
  }

  function handleCountryClick(country: Country) {
    props.onChange(country.name.common);
    setCountry(country.name.common);
  }

  return (
    <div className="mb-4">
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
type="search" name = "country" placeholder="Search countries" value={country} onChange={handlecountryChange} />

      {error && <p>{error.message}</p>}

      {!error && matchingCountries.length === 0 && country !== '' && (
        <p>No matching countries</p>
      )}

      {!error && matchingCountries.length > 0 && (
        <ul>
          {matchingCountries.map(country => (
            <li key={country.name.common} 
            onClick={() => handleCountryClick(country)}
            style={{ cursor: 'pointer' }}>
              {country.name.common}</li>
          ))}
        </ul>
      )}

      {!error && countries.length === 0 && country !== '' && (
        <p>No results</p>
      )}
    </div>
  );
}
