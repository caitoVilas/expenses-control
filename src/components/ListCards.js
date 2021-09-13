import React from 'react';
import {Button} from 'react-bootstrap';

const ListCards = (card) => {
    return (
            <tr key={card.id}>
            <td>{card.card.name}</td>
            <td>
                <Button variant="danger" size="sm">
                <i className="fas fa-trash-alt"></i>
                </Button>
            </td>
            </tr>
    )
}

export default ListCards
