import { useEffect, useState } from 'react';
import { getCities } from '../../apiManager.js';
import { AddCity } from './AddCity.js';

export const AllCities = () => {
  const [allCities, setAllCities] = useState([]);

  const getAllCities = async () => {
    const fetchedCities = await getCities();
    setAllCities(fetchedCities);
  };

  useEffect(() => {
    getAllCities();
  }, []);

  return (
    <>
      <div className="container cities-inner">
        <h3 className="heading cities-heading">Cities:</h3>
        <div className="container allcities-container">
          {allCities.map((city) => {
            return (
              <>
                <div className="container city-container">
                  <h4 className="heading city-heading">{`${city.name}`}</h4>
                </div>
              </>
            );
          })}
        </div>
        <AddCity getAllCities={getAllCities} />
      </div>
    </>
  );
};
