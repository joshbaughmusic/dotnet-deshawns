import { useEffect, useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import {
  getCities,
  getUniqueWalker,
  getWalkerCities,
  putWalker,
} from '../../apiManager.js';

export const WalkerEdit = ({ walkerId, watcher, setWatcher }) => {
  const [modal, setModal] = useState(false);
  const [walker, setWalker] = useState({});
  const [matchedWalkerCityIds, setMatchedWalkerCityIds] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [updatedWalker, setUpdatedWalker] = useState({
    name: '',
  });

  const fetchSingleWalker = async () => {
    const fetchedWalker = await getUniqueWalker(walkerId);
    setWalker(fetchedWalker);
    const copy = { ...updatedWalker };
    copy.name = fetchedWalker.name;
    setUpdatedWalker(copy);
  };

  const fetchAllCities = async () => {
    const fetchedCities = await getCities();
    setAllCities(fetchedCities);
  };

  const fetchWalkerCities = async () => {
    const fetchedWalkerCities = await getWalkerCities();
    const filteredWalkerCities = fetchedWalkerCities.filter(
      (wc) => wc.walkerId === walkerId
    );
    const justCityIdsOfFilteredWalkerCities = filteredWalkerCities.map(
      (wc) => wc.cityId
    );
    setMatchedWalkerCityIds(justCityIdsOfFilteredWalkerCities);
  };

  useEffect(() => {
    fetchSingleWalker();
  }, []);

  useEffect(() => {
    fetchAllCities();
  }, []);

  useEffect(() => {
    fetchWalkerCities();
  }, []);

  const toggle = () => setModal(!modal);

  const checkboxHandler = (e) => {
    let value = parseInt(e.target.value);

    if (!matchedWalkerCityIds.includes(value)) {
      setMatchedWalkerCityIds([...matchedWalkerCityIds, value]);
    } else {
      setMatchedWalkerCityIds((prevData) =>
        prevData.filter((id) => id !== value)
      );
    }
  };

  const handleSubmitButtonClick = async () => {
    const walkersAssignedCities = [];
    for (const wc of matchedWalkerCityIds) {
      const matchedCity = allCities.find((city) => city.id === parseInt(wc));
      walkersAssignedCities.push(matchedCity);
    }
    const walkerObjectToSend = {
      name: updatedWalker.name,
      cities: walkersAssignedCities,
    };

    await putWalker(walkerId, walkerObjectToSend);
    setWatcher(!watcher)
    toggle();
  };

  return (
    <>
      <Button
        color="warning"
        value={walkerId}
        onClick={toggle}
      >
        Edit
      </Button>

      <Modal
        isOpen={modal}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>Edit walker details:</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label htmlFor="walkerName">Name:</Label>
              <Input
                id="walkerName"
                name="walkerName"
                value={updatedWalker.name}
                onChange={(e) => {
                  let copy = { ...updatedWalker };
                  copy.name = e.target.value;
                  setUpdatedWalker(copy);
                }}
              ></Input>
            </FormGroup>
            <p htmlFor="availableCities">Cities Available In:</p>
            {allCities.map((city) => {
              return (
                <>
                  <FormGroup check>
                    <Label
                      check
                      htmlFor={`city--${city.id}`}
                    >
                      {city.name}
                    </Label>
                    <Input
                      id={`city--${city.id}`}
                      name={`city--${city.id}`}
                      type="checkbox"
                      value={city.id}
                      checked={matchedWalkerCityIds.includes(city.id)}
                      onChange={checkboxHandler}
                    />
                  </FormGroup>
                </>
              );
            })}
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={handleSubmitButtonClick}
          >
            Submit
          </Button>
          <Button
            color="secondary"
            onClick={toggle}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
