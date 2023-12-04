import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';

const BetTable = ({ setCurrDoubloons }) => {
    const [bets, setBets] = useState([]);
    const [selectedOption, setSelectedOption] = useState('recentlyPlaced');
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [selectedBetToDelete, setSelectedBetToDelete] = useState(null);

    useEffect(() => {
        const storedBets = localStorage.getItem('bets');
        if (storedBets) {
            setBets(JSON.parse(storedBets));
        }
    }, []);

    const handleDelete = (uid, gameDate, betAmount) => {
        // Show the confirmation modal and set the selected bet for deletion
        setSelectedBetToDelete({ uid, gameDate, betAmount });
        setShowConfirmationModal(true);
    };

    const handleConfirmDelete = () => {
        const { uid, betAmount } = selectedBetToDelete;

        // Filter out the bet with the specified UUID
        const updatedBets = bets.filter((bet) => bet.uid !== uid);
        const currentDabloons = parseInt(localStorage.getItem('dabloons'));
        const refundAmount = parseInt(betAmount);
        localStorage.setItem('dabloons', `${currentDabloons + refundAmount}`);
        setCurrDoubloons(currentDabloons + refundAmount);

        // Update the state and local storage with the modified data
        setBets(updatedBets);
        localStorage.setItem('bets', JSON.stringify(updatedBets));

        // Close the confirmation modal
        setShowConfirmationModal(false);
        setSelectedBetToDelete(null);
    };

    const handleCancelDelete = () => {
        // Close the confirmation modal without deleting the bet
        setShowConfirmationModal(false);
        setSelectedBetToDelete(null);
    };

    const handleDropdownChange = (selected) => {
        setSelectedOption(selected);
        localStorage.setItem('selectedOption', selected);
    };

    const renderTable = () => {
        let sortedBets = [...bets];

        if (selectedOption === 'gameDate') {
            sortedBets = sortedBets.sort((a, b) => new Date(a.date) - new Date(b.date));
        }

        return (
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Game Date</th>
                    <th>Amount</th>
                    <th>Odds</th>
                    <th>Prop</th>
                    <th>Prop Name</th>
                    <th>Cancel</th>
                </tr>
                </thead>
                <tbody>
                {sortedBets.map((bet, index) => (
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
                                onClick={() => handleDelete(bet.uid, bet.date, bet.amount)}
                            >
                                Cancel
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
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
                        <Dropdown.Item eventKey="recentlyPlaced">Recently Placed</Dropdown.Item>
                        <Dropdown.Item eventKey="gameDate">Game Date</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <span style={{ marginLeft: '10px' }}>Selected Option: {selectedOption}</span>
            </div>

            {bets.length > 0 ? renderTable() : <p>When you start to place bets, you can find the history here</p>}

            {/* Confirmation Modal */}
            <Modal show={showConfirmationModal} onHide={handleCancelDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Bet Cancellation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to cancel this bet? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancelDelete}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BetTable;
