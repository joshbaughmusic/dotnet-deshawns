import { useEffect, useState } from 'react';
import { deleteWalker, getCities, getWalkerCities, getWalkers } from '../../apiManager.js';
import { Button, ButtonGroup, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, useRoutes } from 'react-router-dom';
import { AssignDog } from './AssignDog.js';
import { WalkerEdit } from './WalkerEdit.js';

export const AllWalkers = () => {
  const [allCities, setAllCities] = useState([]);
  const [allWalkers, setAllWalkers] = useState([]);
  const [allWalkerCities, setAllWalkerCities] = useState([]);
  const [filterTerms, setFilterTerms] = useState();
  const [filteredWalkers, setFilteredWalkers] = useState([]);
  const [watcher, setWatcher] = useState(false)

  const getAllWalkers = async () => {
    const fetchedWalkers = await getWalkers();
    setAllWalkers(fetchedWalkers);
    setFilteredWalkers(fetchedWalkers);
  };

  const getAllCities = async () => {
    const fetchedCities = await getCities();
    setAllCities(fetchedCities);
  };

  const getAllWalkerCities = async () => {
    const fetchedWalkerCities = await getWalkerCities();
    setAllWalkerCities(fetchedWalkerCities);
  };

  useEffect(() => {
    getAllCities();
  }, []);

  useEffect(() => {
    getAllWalkers();
  }, []);

  useEffect(() => {
    getAllWalkerCities();
  }, []);

  useEffect(() => {
    if (filterTerms === 0) {
      setFilteredWalkers(allWalkers);
    } else {
      const getMatchingWalkerCities = allWalkerCities.filter(
        (wc) => wc.cityId === filterTerms
      );
      const filteredWalkersByCity = allWalkers.filter((walker) => {
        for (const wc of getMatchingWalkerCities) {
          if (walker.id === wc.walkerId) {
            return true;
          }
        }
      });
      setFilteredWalkers(filteredWalkersByCity);
    }
  }, [filterTerms]);

  const handleDeleteWalkerClick = async e => {
    const walkerId = e.target.value;
    await deleteWalker(walkerId);
    await getAllWalkers();
    await getAllWalkerCities();
  }

  return (
    <>
      <div className="container walkers-inner">
        <h3 className="heading walkers-heading">Walkers:</h3>
        <div className="container container-walkers-filter">
          <Form>
            <FormGroup>
              <Input
                id="filterByCity"
                name="filterByCity"
                type="select"
                onChange={(e) => {
                  const cityId = e.target.value;
                  setFilterTerms(parseInt(cityId));
                }}
              >
                <option value={0}>filter by city</option>
                {allCities.map((city) => {
                  return (
                    <>
                      <option value={city.id}>{city.name}</option>
                    </>
                  );
                })}
              </Input>
            </FormGroup>
          </Form>
        </div>
        <div className="container allwalkers-container">
          {filteredWalkers.map((walker) => {
            return (
              <>
                <div className="container walker-container">
                  <h4 className="heading walker-heading">{`${walker.name}`}</h4>
                  <ButtonGroup>
                    <AssignDog
                      watcher={watcher}
                      walkerId={walker.id}
                    />
                    <WalkerEdit
                      watcher={watcher}
                      setWatcher={setWatcher}
                      walkerId={walker.id}
                    />
                    <Button
                      value={walker.id}
                      color="danger"
                      onClick={handleDeleteWalkerClick}
                    >
                      Remove
                    </Button>
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
