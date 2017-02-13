let React = require('react');

class NotesEditor extends React.Component {
    constructor() {
        super()

        this.state = {
            text: '',
        }

        this.handleTextChange = this.handleTextChange.bind(this);
        this.addNote = this.addNote.bind(this);
    }

    handleTextChange(e) {
        this.setState({
            text: e.target.value
        })
    }

    addNote(e) {
        e.preventDefault()
        let newNote = {
            id: Date.now(),
            text: this.state.text,
            done: false
        };

        this.props.onAddNote(newNote);
        this.setState({
            text: ''
        });
    }

    render() {
        return (
            <form onSubmit={this.addNote}>
                <div className="input-group">
                    <input type="text"
                        className="form-control"
                        placeholder="New Task"
                        value={this.state.text}
                        onChange={this.handleTextChange}
                    />
                    <span className="input-group-btn">
                        <button
                            className="btn btn-primary"
                            type="submit">
                            Add
                        </button>
                    </span>
                </div>
            </form>
        );
    }
}

module.exports = NotesEditor;