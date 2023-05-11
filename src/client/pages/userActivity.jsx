import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from '../api/axios';
import TakeActivityModal from '../components/TakeActivityModal.jsx';


const UserActivityTable = () => {
    const [activities, setActivities] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [showModal, setShowModal] = useState(false);
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

    const handleCloseModal = () => {
        setSelectedActivity(null);
        setShowModal(false);
    };

    const handleShowModal = (activity) => {
        setSelectedActivity(activity);
        setShowModal(true);
    };
    return (
        <div className="container mt-5 brand ">
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
                                <Button variant="outline-warning" onClick={() => handleShowModal(activity)}>
                                    View Activity
                                </Button>{' '}
                                
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <TakeActivityModal
                show={showModal}
                handleClose={handleCloseModal}
                selectedActivity={selectedActivity}
                setSelectedActivity={setSelectedActivity}
            />
        </div>
    );
};
export default UserActivityTable;