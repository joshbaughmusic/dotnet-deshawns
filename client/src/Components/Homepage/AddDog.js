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
import { getCities, postDog } from '../../apiManager.js';
import { useNavigate } from 'react-router-dom';

export const AddDog = () => {
  const [modal, setModal] = useState(false);
  const [allCities, setAllCities] = useState([]);
  const [newDog, setNewDog] = useState({
    name: '',
    city: null,
  });
  const navigate = useNavigate();

  const getAllCitites = async () => {
    const fetchedCities = await getCities();
    setAllCities(fetchedCities);
  };

  useEffect(() => {
    getAllCitites();
  }, []);

  const toggle = () => setModal(!modal);

  const handleSubmitButtonClick = async (e) => {
    const postedDog = await postDog(newDog);
    const postedDogData = await postedDog.json();
    const dogId = postedDogData.id;
    navigate(`/dogdetails/${dogId}`);

    toggle();
    setNewDog({
      name: '',
      city: '',
    });
  };

  return (
    <>
      <Button
        color="primary"
        onClick={toggle}
      >
        Add Dog
      </Button>

      <Modal
        isOpen={modal}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>Add a new dog:</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="name">Dog Name:</Label>
              <Input
                id="name"
                name="name"
                placeholder="BillyBobJoeBob..."
                onChange={(e) => {
                  let copy = { ...newDog };
                  copy.name = e.target.value;
                  setNewDog(copy);
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="cityId">City:</Label>
              <Input
                id="cityId"
                name="cityId"
                type="select"
                onChange={(e) => {
                  let copy = { ...newDog };
                  copy.cityId = parseInt(e.target.value);
                  setNewDog(copy);
                }}
              >
                <option value={null}>select a city</option>
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
