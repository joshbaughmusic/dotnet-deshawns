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
import { getDogs, getWalkerCities, postAssignDog } from '../../apiManager.js';
import { useNavigate } from 'react-router-dom';

export const AssignDog = ({ walkerId, watcher }) => {
  const [availableDogs, setAvailableDogs] = useState([]);
  const [modal, setModal] = useState(false);
  const [assignedDog, setAssignedDog] = useState({
    id: null,
    walkerId: walkerId,
  });

  const navigate = useNavigate();

  const toggle = () => setModal(!modal);

  const getAvailableDogs = async () => {
    try {
      // Fetch walkerCities
      const walkerCities = await getWalkerCities();

      // Filter matched cities
      const matchedWalkerCities = walkerCities.filter(
        (wc) => wc.walkerId === walkerId
      );
      const cityIds = matchedWalkerCities.map((wc) => wc.cityId);

      // Fetch all dogs
      const allDogs = await getDogs();

      // Filter dogs based on cityIds
      const foundDogs = allDogs.filter(
        (dog) => cityIds.includes(dog.cityId) && dog.walkerId === null
      );

      setAvailableDogs(foundDogs);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getAvailableDogs();
  }, [watcher]);

  const handleSubmitButtonClick = async (e) => {
    const submitAssignedDog = await postAssignDog(assignedDog)
    navigate(`/dogdetails/${assignedDog.id}`)
  };
  return (
    <>
      <Button
        color="primary"
        value={walkerId}
        onClick={toggle}
      >
        Assign
      </Button>

      <Modal
        isOpen={modal}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>Add a new dog:</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="dogId">
                Assign an available dog in this walker's accepted cities:
              </Label>
              <Input
                id="dogId"
                name="dogId"
                type="select"
                onChange={(e) => {
                  let copy = { ...assignedDog };
                  copy.id = parseInt(e.target.value);
                  setAssignedDog(copy);
                }}
              >
                <option value={null}>select a dog</option>
                {availableDogs.map((dog) => {
                  return (
                    <>
                      <option value={dog.id}>{dog.name}</option>
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
