import { useEffect, useState } from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import { getDogs } from '../../apiManager.js';
import './Homepage.css';

export const AllDogs = () => {
  const [allDogs, setAllDogs] = useState([]);

  useEffect(async () => {
    const fetchedDogs = await getDogs();
    setAllDogs(fetchedDogs);
  }, []);

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
                    <Button color="primary">Details</Button>
                    <Button color="danger">Delete</Button>
                  </ButtonGroup>
                </div>
              </>
            );
        })}
        </div>
        <Button color="primary">Add dog</Button>
      </div>
    </>
  );
};
