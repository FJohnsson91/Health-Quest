import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from '../api/axios';
import ActivityModal from '../components/ActivityModal';

const ActivityTable = () => {
    const [activities, setActivities] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formd, setFormd] = useState('add')

    const token = localStorage.getItem("token")
    useEffect(() => {
        const fetchActivities = async () => {
            const response = await axios.get('/activity', {
                headers: { 'Content-Type': 'application/json' }
            });
            setActivities(response.data);
        };
        fetchActivities();
    }, []);

    const handleDelete = async (id) => {
        if (confirm("You Really Want to Delete the Record") == true) {
            try {
                await axios.delete(`/activity/${id}`, {
                    headers: {
                        'Authorization': token ? `Bearer ${token}` : ''
                    }
                });
                alert("deleted")
                setActivities(activities.filter(activity => activity._id !== id));
            } catch (err) {
                console.log(err);
            }
        } else {
            return
        }
    };

    const handleCloseModal = () => {
        setSelectedActivity(null);
        setShowModal(false);
    };

    const handleShowModal = (activity, mode) => {
        setSelectedActivity(activity);
        setShowModal(true);
        setFormd(mode)
    };

    const handleAddActivity = async (activity) => {

        try {
            const response = await axios.post('/activity', activity, {
                headers: {
                    'Authorization': token ? `Bearer ${token}` : ''
                }
            });
            setActivities([...activities, response.data]);
            handleCloseModal();
        } catch (err) {
            console.log(err);
        }
    };

    const handleEditActivity = async (activity) => {
        try {
            const response = await axios.put(`/activity/${activity._id}`, activity, {
                headers: {
                    'Authorization': token ? `Bearer ${token}` : ''
                }
            });
            const updatedActivities = activities.map(a => a._id === response.data._id ? response.data : a);
            setActivities(updatedActivities);
            handleCloseModal();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container mt-5 brand ">
            <Button className='brand mt-3 mb-3' variant="outline-secondary" onClick={() => handleShowModal(null,"add")}>
                <span className='brand m-3'>Add Activity</span>
            </Button>

            <Table bordered className="brand">
                <thead>
                    <tr className="brand">
                        <th>Activity</th>
                        <th>Points</th>
                        <th>Duration</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {activities.map((activity) => (
                        <tr key={activity._id} className="brand">
                            <td>{activity.activity}</td>
                            <td>{activity.points}</td>
                            <td>{activity.duration}</td>
                            <td className="w-25">
                                <Button variant="outline-warning" onClick={() => handleShowModal(activity, "Edit")}>
                                    Edit
                                </Button>{' '}
                                <Button variant="outline-danger" onClick={() => handleDelete(activity._id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <ActivityModal
                show={showModal}
                handleClose={handleCloseModal}
                handleAddActivity={handleAddActivity}
                handleEditActivity={handleEditActivity}
                selectedActivity={selectedActivity}
                setSelectedActivity={setSelectedActivity}
                formd={formd}
            />
        </div>
    );
};

export default ActivityTable;
