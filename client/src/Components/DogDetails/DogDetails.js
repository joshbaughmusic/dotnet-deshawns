import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUniqueDog } from '../../apiManager.js';

export const DogDetails = () => {
  const { dogId } = useParams();
  const [singleDogDetails, setSingleDogDetails] = useState({});

  const getSingleDog = async () => {
    const fetchedDog = await getUniqueDog(dogId);
    setSingleDogDetails(fetchedDog);
  };

  useEffect(() => {
    getSingleDog();
  }, []);

  if (!singleDogDetails.name) {
    return null;
  }

  return (
    <>
      <h3 className="heading heading-dogdetails">Dog Details</h3>
      <div className="container container-dogdetails">
        <p className="dogName">Name: {singleDogDetails.name}</p>
        <p className="dogCity">City: {singleDogDetails.city?.name}</p>
        {singleDogDetails.walker ? (
          <p className="dogWalker">Walker: {singleDogDetails.walker?.name}</p>
        ) : (
          <p className="dogWalker">No walker assigned yet!</p>
        )}
      </div>
    </>
  );
};
