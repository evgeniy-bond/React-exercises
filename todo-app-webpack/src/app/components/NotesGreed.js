let React = require('react');

import Note from './Note';

class NotesGreed extends React.Component {
    constructor() {
        super()
    }

    render() {
        let style = {
            marginTop: "20px"
        };

        let notes = this.props.notes;

        return (
            <div>
                <ul className="list-group" style={style}>
                    {
                        notes.map((note, i) => {
                            return (
                                <Note
                                    key={note.id}
                                    done={note.done}
                                    deleteNote={this.props.onDelete.bind(null, note)}
                                    doneTask={this.props.onDoneTask.bind(null, note)}
                                >
                                    {note.text}
                                </Note>
                            )
                        }).reverse()
                    }
                </ul>
            </div>
        );
    }
}

module.exports = NotesGreed;