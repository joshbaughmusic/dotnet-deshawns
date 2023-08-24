import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUniqueDog } from '../../apiManager.js';

export const DogDetails = () => {
  const { dogId } = useParams();
  const [singleDogDetails, setSingleDogDetails] = useState({});

  useEffect(async () => {
    const fetchedDog = await getUniqueDog(dogId);
    setSingleDogDetails(fetchedDog);
  }, []);

  return (
    <>
      <h3 className="heading heading-dogdetails">Dog Details</h3>
      <div className="container container-dogdetails">
        <p className="dogName">Name: {singleDogDetails.name}</p>
        <p className="dogCity">City: {singleDogDetails.city?.name}</p>
        <p className="dogWalker">Walker: {singleDogDetails.walker?.name}</p>
      </div>
    </>
  );
};
