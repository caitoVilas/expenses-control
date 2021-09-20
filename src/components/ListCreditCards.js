import{Button} from 'react-bootstrap';

const ListCreditCards = (cc) => {
    return (
        <tr>
          <td key={cc.cc.id}>{cc.cc.card.name} {cc.cc.institution.name} </td>
          <td>
             <Button variant="danger" size="sm">
              <i className="fas fa-trash-alt"></i>
             </Button>
          </td>
        </tr>
    )
}

export default ListCreditCards
