import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from '../api/axios';
import useAuth from "../hooks/useAuth";

const TakeActivityModal = ({ selectedActivity, show, handleClose }) => {
    const { auth, setAuth } = useAuth();
    const [isTimerStarted, setIsTimerStarted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState("");
    const token = localStorage.getItem("token")

    useEffect(() => {
        let timerId;
        if (isTimerStarted && timeRemaining > 0) {
            timerId = setInterval(() => {
                setTimeRemaining(prevTime => prevTime - 1);
            }, 1000);
        }
        return () => clearInterval(timerId);
    }, [isTimerStarted, timeRemaining]);

    const handleStart = () => {
        setTimeRemaining(selectedActivity.duration * 60)
        setIsTimerStarted(true);
    }
    // console.log(auth)
    const handleFinish = async () => {
        // Validate and send request to API 
        var activity = {
            userId: auth?.user?._id,
            activityId: selectedActivity?._id,
            activityPoints: selectedActivity?.points
        }
        try {
            const response = await axios.post('/finish-activity', activity, {
                headers: {
                    'Authorization': token ? `Bearer ${token}` : ''
                }
            });
            alert(response?.data?.message)
            var plus = auth?.user?.points + selectedActivity?.points
            // auth?.user?.points = plus
            setAuth({ ...auth, user: { _id: auth?.user?._id, username: auth?.user?.username, role: auth?.user?.role, points: auth?.user?.points?auth?.user?.points + selectedActivity?.points:0 + selectedActivity?.points } });
            setTimeRemaining('');
            setIsTimerStarted(false);
            handleClose();
        } catch (err) {
            console.log(err);
        }
    }

    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    const formattedDuration = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    return (
        <>

            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header className='brand bg-dark'>
                    <Modal.Title className='brand'>{selectedActivity?.activity}</Modal.Title>
                </Modal.Header>
                <Modal.Body className='brand bg-dark'>
                    <p>Reward: {selectedActivity?.points} points.</p>
                    <p>Duration: {selectedActivity?.duration} minutes</p>
                    {isTimerStarted && <p>Time remaining: {timeRemaining} seconds</p>}

                </Modal.Body>
                <Modal.Footer className='brand bg-dark'>
                    {!isTimerStarted && (
                        <Button variant="danger" onClick={handleClose}>
                            Close
                        </Button>
                    )}
                    {!isTimerStarted && (
                        <Button variant="warning" onClick={handleStart}>
                            Start Activity
                        </Button>
                    )}
                    {isTimerStarted && (
                        <Button variant="warning" disabled>
                            Start Activity
                        </Button>
                    )}
                    {isTimerStarted && timeRemaining <= 0 && (
                        <Button variant="danger" onClick={handleFinish}>
                            Finish ({formattedDuration})
                        </Button>
                    )}
                    {isTimerStarted && timeRemaining > 0 && (
                        <Button variant="danger" disabled>
                            Finish ({formattedDuration})
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default TakeActivityModal;