import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const UserFormModal = ({ showModal,errMsg, handleCloseModal, handleEditUser,handleAddUser, selectedUser, setSelectedUser,mode }) => {
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setSelectedUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        console.log(selectedUser, name, value)
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        mode==="edit"?handleEditUser(selectedUser):handleAddUser(selectedUser);
      };
    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton className='bg-dark'>
                <Modal.Title className='brand'>{selectedUser ? 'Edit User' : 'Add User'}</Modal.Title>
            </Modal.Header>
            <Modal.Body className='bg-dark'>
            {errMsg?<p className={errMsg ? "errmsg" : "offscreen" } aria-live="assertive">{errMsg}</p>:null}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className='brand' htmlFor="username">User Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            placeholder="Enter User name"
                            value={selectedUser?.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className='brand' htmlFor="role">Role</label>
                        <select className="form-control" name="role" value={selectedUser?.role} onChange={handleChange} required>
                            <option value="user">user</option>
                            <option value="admin">admin</option>
                        </select>
                    </div>
                    {mode !=="edit"?<div className="form-group">
                        <label className='brand' htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            placeholder="Enter Password"
                            // value={""}
                            onChange={handleChange}
                            required
                        />
                    </div>:null}
                    <div className="form-group">
                        <label className='brand' htmlFor="points">Points</label>
                        <input
                            type="number"
                            className="form-control"
                            name="points"
                            placeholder="Enter points"
                            value={selectedUser?.points ? selectedUser?.points : 0}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <Button variant="outline-success" type="submit" className='mt-3'>
                        Save
                    </Button>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default UserFormModal;