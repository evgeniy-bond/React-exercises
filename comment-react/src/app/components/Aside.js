let React = require('react');

import ListGroup from './ListGroup';

class Aside extends React.Component {

    render() {
        return (
            <aside className="col-xs-3">
                <h2>Nav</h2>
                <ListGroup></ListGroup>
            </aside>
        );
    }
}

module.exports = Aside;