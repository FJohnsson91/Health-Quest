import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import { Table, Button, Modal } from "react-bootstrap";
import UserFormModal from "../components/UserFormModal";
// import UserDetail from "./UserDetail";
import useAuth from "../hooks/useAuth";


const AdminUsersView = () => {
    const { auth } = useAuth();
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formMode, setFormMode] = useState("create");
    const token = localStorage.getItem("token")
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        axios.get("/users", {
            headers: {
                'Authorization': token ? `Bearer ${token}` : ''
            }
        }).then((res) => {
            setUsers(res.data);
        });
    }, []);

    const handleAddUser = async (user) => {
        setFormMode("create");
        try {
            const response = await axios.post('/users', user, {
                headers: {
                    'Authorization': token ? `Bearer ${token}` : ''
                }
            });
            setUsers([...users, response.data]);
            handleCloseModal();

        } catch (err) {
            setErrMsg(err.response?.data?.message);
        }
    };

    const handleEditUser = async (user) => {
        // setSelectedUser(user);
        setFormMode("edit");
        // handleShowModal(null)
        try {
            const response = await axios.put(`/users/${user._id}`, user, {
                headers: {
                    'Authorization': token ? `Bearer ${token}` : ''
                }
            });
            const updatedUser = users.map(a => a._id === response.data._id ? response.data : a);
            setUsers(updatedUser);
            response.data?handleCloseModal():null;
        } catch (err) {
            console.log(err);
        }
    };

    const handleDeleteUser = (user) => {
        if (confirm("You Really Want to Delete the Record") == true) {
            axios.delete(`/users/${user._id}`, {
                headers: {
                    'Authorization': token ? `Bearer ${token}` : ''
                }
            }).then(() => {
                setUsers(users.filter((u) => u._id !== user._id));
            });
        } else {
            return
        }

    };

    const handleCloseModal = () => {
        setSelectedUser(null);
        setShowModal(false);
        setErrMsg("")
        setFormMode("create");

    };

    const handleShowModal = (user,mode) => {
        setSelectedUser(user);
        setShowModal(true);
        setFormMode(mode)
    };

    return (
        <div className="brand container">
            <div className="d-flex mt-4 justify-content-between align-items-center mb-4 container">
                <h2 className="brand">All Current Users</h2>
                <Button variant="outline-secondary" onClick={() => handleShowModal(null,"create")}>
                    <span className='brand'>Add User</span>
                </Button>
            </div>
            <Table className="brand bordered">
                <thead>
                    <tr className="brand">
                        <th>Username</th>
                        <th>Points</th>
                        <th>Total Activities completed</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user) => (
                        <tr key={user._id} className="brand">
                            <td style={{color: "white"}}>{user.username}</td>
                            <td style={{color: "white"}}>{user.points ? user.points : 0}</td>
                            <td style={{color: "white"}} className="w-25">{user.activityCount}</td>
                            <td style={{color: "white"}}>{user.role}</td>
                            <td className="w-25">
                                <Button
                                    variant="outline-secondary"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => handleShowModal(user,"edit")}
                                    style={{minWidth: "90px", marginBottom: "2px", marginTop: "2px"}}
                                >
                                    <span className='brand'>Add Points</span>
                                </Button>
                                <Button
                                    variant="outline-warning"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => handleShowModal(user,"edit")}
                                    style={{minWidth: "90px", marginBottom: "2px", marginTop: "2px"}}
                                >
                                    Edit
                                </Button>
                               {auth?.user._id !== user._id? <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => handleDeleteUser(user)}
                                    style={{minWidth: "90px", marginBottom: "2px", marginTop: "2px"}}
                                >
                                    Delete
                                </Button>:null}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <UserFormModal
                selectedUser={selectedUser}
                mode={formMode}
                showModal={showModal}
                handleCloseModal={handleCloseModal}
                setSelectedUser={setSelectedUser}
                handleAddUser={handleAddUser}
                handleEditUser={handleEditUser}
                errMsg={errMsg}
            />
        </div>
    );
};

export default AdminUsersView;
