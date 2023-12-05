import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';

const BetTable = ({ setCurrDoubloons }) => {
    const [bets, setBets] = useState([]);
    const [selectedOption, setSelectedOption] = useState('Recently Placed');
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [selectedBetsToDelete, setSelectedBetsToDelete] = useState([]);
    const [showMultipleDeleteConfirmation, setShowMultipleDeleteConfirmation] = useState(false);
    const [showIndividualDeleteConfirmation, setShowIndividualDeleteConfirmation] = useState(false);
    const [selectedIndividualBetToDelete, setSelectedIndividualBetToDelete] = useState(null);

    useEffect(() => {
        const storedBets = localStorage.getItem('bets');
        if (storedBets) {
            setBets(JSON.parse(storedBets));
        }
    }, []);

    const handleDelete = (uid, gameDate, betAmount) => {
        if (selectedBetsToDelete.includes(uid)) {
            // If the checkbox is unchecked, remove the bet from the array
            setSelectedBetsToDelete(selectedBetsToDelete.filter(id => id !== uid));
        } else {
            // If the checkbox is checked, add the bet to the array
            setSelectedBetsToDelete([...selectedBetsToDelete, uid]);
        }
    };

    const handleCancelIndividual = (uid) => {
        const betToDelete = bets.find((bet) => bet.uid === uid);
        if (betToDelete) {
            // Show the confirmation modal and set the selected bet for deletion
            setSelectedIndividualBetToDelete(betToDelete);
            setShowIndividualDeleteConfirmation(true);
        }
    };

    const handleConfirmDeleteIndividual = () => {
        const { uid } = selectedIndividualBetToDelete;

        const currentDabloons = parseInt(localStorage.getItem('dabloons'));
        const refundAmount = parseInt(selectedIndividualBetToDelete.amount);
        localStorage.setItem('dabloons', `${currentDabloons + refundAmount}`);
        setCurrDoubloons(currentDabloons + refundAmount);

        const updatedBets = bets.filter((bet) => bet.uid !== uid);
        setBets(updatedBets);
        localStorage.setItem('bets', JSON.stringify(updatedBets));

        // Close the confirmation modal
        setShowIndividualDeleteConfirmation(false);
        setSelectedIndividualBetToDelete(null);
    };

    const handleCancelDeleteIndividual = () => {
        // Close the confirmation modal without deleting the individual bet
        setShowIndividualDeleteConfirmation(false);
        setSelectedIndividualBetToDelete(null);
    };

    const handleDropdownChange = (selected) => {
        setSelectedOption(selected);
        localStorage.setItem('selectedOption', selected);
    };

    const handleDeleteMultiple = () => {
        setShowMultipleDeleteConfirmation(true);
    };

    const handleConfirmDeleteMultiple = () => {
        selectedBetsToDelete.forEach((uid) => {
            handleConfirmDelete(uid);
        });

        // Clear the array of selected bets and uncheck all checkboxes
        setSelectedBetsToDelete([]);
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
        });

        setShowMultipleDeleteConfirmation(false);
    };

    const handleCancelDeleteMultiple = () => {
        setShowMultipleDeleteConfirmation(false);
        setSelectedBetsToDelete([]);
    };

    const handleConfirmDelete = (uid) => {
        const updatedBets = bets.filter((bet) => !selectedBetsToDelete.includes(bet.uid));
        const currentDabloons = parseInt(localStorage.getItem('dabloons'));
        const refundAmount = bets.find((bet) => bet.uid === uid)?.amount || 0;

        localStorage.setItem('dabloons', `${currentDabloons + parseInt(refundAmount)}`);
        setCurrDoubloons(currentDabloons + parseInt(refundAmount));

        setBets(updatedBets);
        localStorage.setItem('bets', JSON.stringify(updatedBets));

        setSelectedBetsToDelete([]);
    };

    const handleCancelDelete = () => {
        setSelectedBetsToDelete([]);
    };

    const renderTable = () => {
        let sortedBets = [...bets];

        if (selectedOption === 'Game Date') {
            sortedBets = sortedBets.sort((a, b) => new Date(a.date) - new Date(b.date));
        }

        return (

            <div style={{ overflowX: 'auto', maxHeight: '500px', maxWidth: '800px' /* Set the desired max height */ }}>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Game Date</th>
                        <th>Amount</th>
                        <th>Odds</th>
                        <th>Prop</th>
                        <th>Prop Name</th>
                        <th>Cancel</th>
                        <th>Select</th>
                    </tr>
                    </thead>
                    <tbody>
                    {sortedBets.reverse().map((bet, index) => (
                        <tr key={index}>
                            <td>{bet.date}</td>
                            <td>{bet.amount}</td>
                            <td>{bet.odds}</td>
                            <td>{bet.prop}</td>
                            <td>{bet.propName}</td>
                            <td>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    disabled={new Date() > new Date(bet.date)}
                                    onClick={() => handleCancelIndividual(bet.uid)}
                                >
                                    Cancel
                                </Button>
                            </td>
                            <td>
                                <input
                                    type="checkbox"
                                    onChange={() => handleDelete(bet.uid, bet.date, bet.amount)}
                                    disabled={new Date() > new Date(bet.date)}
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        );
    };

    return (
        <div className="ml-auto">
            <h2>Bet History</h2>

            <div>
                <Dropdown onSelect={handleDropdownChange}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Sort By
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item eventKey="Recently Placed">Recently Placed</Dropdown.Item>
                        <Dropdown.Item eventKey="Game Date">Game Date</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>


                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span style={{ marginLeft: '10px' }}>Selected Option: {selectedOption}</span>
                    <Button
                        variant="danger"
                        onClick={handleDeleteMultiple}
                        disabled={selectedBetsToDelete.length === 0}
                        style={{ marginLeft: '10px' }}
                    >
                        Cancel Selected Bets
                    </Button>
                </div>

            </div>

            {bets.length > 0 ? renderTable() : <p>When you start to place bets, you can find the history here</p>}



            {/* Confirmation Modal for Multiple Deletions */}
            <Modal show={showMultipleDeleteConfirmation} onHide={handleCancelDeleteMultiple}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Multiple Bet Cancellation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to cancel the selected bets? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancelDeleteMultiple}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDeleteMultiple}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Confirmation Modal for Individual Deletion */}
            <Modal show={showIndividualDeleteConfirmation} onHide={handleCancelDeleteIndividual}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Individual Bet Cancellation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to cancel this bet? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancelDeleteIndividual}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDeleteIndividual}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BetTable;
