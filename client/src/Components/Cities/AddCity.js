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
import { useNavigate } from 'react-router-dom';
import { postCity } from '../../apiManager.js';

export const AddCity = ({ getAllCities }) => {
  const [modal, setModal] = useState(false);
  const [newCity, setNewCity] = useState({
    name: '',
  });

  const toggle = () => setModal(!modal);

  const handleSubmitButtonClick = async (e) => {
    const postedCity = await postCity(newCity);
    await getAllCities();

    toggle();
    setNewCity({
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
        Add City
      </Button>

      <Modal
        isOpen={modal}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>Add a new city:</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="name">City Name:</Label>
              <Input
                id="name"
                name="name"
                placeholder="Somewhere..."
                onChange={(e) => {
                  let copy = { ...newCity };
                  copy.name = e.target.value;
                  setNewCity(copy);
                }}
              />
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
