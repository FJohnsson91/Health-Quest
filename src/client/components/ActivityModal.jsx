import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ActivityModal = ({ show,setSelectedActivity,formd, handleClose, handleEditActivity, handleAddActivity,selectedActivity}) => {

    const handleChange = (event) => {
    const { name, value } = event.target;
    setSelectedActivity((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    formd==="Edit"?handleEditActivity(selectedActivity):handleAddActivity(selectedActivity);
  };

  return (
    <Modal show={show} onHide={handleClose} >
      <Modal.Header closeButton className='bg-dark'>
        <Modal.Title className='brand'>Activity</Modal.Title>
      </Modal.Header>
      <Modal.Body className='bg-dark'>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="activity" className="form-label brand">
              Activity
            </label>
            <input
              type="text"
              className="form-control"
              id="activity"
              name="activity"
              value={selectedActivity?.activity}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="points" className="form-label brand">
              Points
            </label>
            <input
              type="number"
              className="form-control"
              id="points"
              name="points"
              value={selectedActivity?.points}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="duration" className="form-label brand">
              Duration (in minutes)
            </label>
            <input
              type="number"
              className="form-control"
              id="duration"
              name="duration"
              value={selectedActivity?.duration}
              onChange={handleChange}
              required
            />
          </div>
          <div className='flex'>
          <Button  variant="outline-danger" onClick={handleClose}>
            Close
          </Button>
          <Button  type="submit" variant="outline-success" className="brand ms-3">
            Save
          </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};
export default ActivityModal;