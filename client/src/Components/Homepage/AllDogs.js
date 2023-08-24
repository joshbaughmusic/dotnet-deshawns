import { useEffect, useState } from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import { getDogs } from '../../apiManager.js';
import './Homepage.css';
import { useNavigate } from 'react-router-dom';

export const AllDogs = () => {
  const [allDogs, setAllDogs] = useState([]);

  const navigate = useNavigate();

  const getAllDogs = async () => {
    const fetchedDogs = await getDogs();
    setAllDogs(fetchedDogs);
  };
  
  useEffect(() => {
    getAllDogs()
  }, []);

  const handleDogDetailsClick = (e) => {
    const dogId = e.target.value;
    navigate(`/dogdetails/${dogId}`);
  };

  return (
    <>
      <div className="container homepage-inner">
        <h3 className="heading alldogs-heading">All dogs:</h3>
        <div className="container alldogs-container">
          {allDogs.map((dog) => {
            return (
              <>
                <div className="container dog-container">
                  <h4 className="heading dog-heading">{`${dog.name}`}</h4>
                  <ButtonGroup>
                    <Button
                      value={dog.id}
                      onClick={handleDogDetailsClick}
                      color="primary"
                    >
                      Details
                    </Button>
                    <Button color="danger">Delete</Button>
                  </ButtonGroup>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};
