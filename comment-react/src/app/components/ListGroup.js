let React = require('react');

class ListGroup extends React.Component {

    render() {
        return (
            <div className="list-group">
                <a href="#" className="list-group-item active">Cras justo odio</a>
                <a href="#" className="list-group-item">Dapibus ac facilisis in</a>
                <a href="#" className="list-group-item">Morbi leo risus</a>
                <a href="#" className="list-group-item">Porta ac consectetur ac</a>
                <a href="#" className="list-group-item">Vestibulum at eros</a>
            </div>
        );
    }
}

module.exports = ListGroup;