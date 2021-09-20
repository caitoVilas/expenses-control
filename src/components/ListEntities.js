
import React from 'react'
import {Button} from 'react-bootstrap';

const ListEntities = (entity) => {
   
    return (
        <tr>
          <td key={entity.entity.id}>{entity.entity.name}</td>
          <td>
             <Button variant="danger" size="sm">
              <i className="fas fa-trash-alt"></i>
             </Button>
          </td>
        </tr>
    )
}

export default ListEntities
