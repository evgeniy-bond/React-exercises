let React = require('react');

class Note extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <li className={`list-group-item ${(this.props.done ? 'done' : '')}`}>
                <input
                    type="checkbox"
                    onChange={this.props.doneTask}
                    checked={this.props.done}
                />
                <span>{this.props.children}</span>
                <span className="close" onClick={this.props.deleteNote}>x</span>
            </li>
        );
    }
}

module.exports = Note;