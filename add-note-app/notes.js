class Note extends React.Component {
    constructor() {
        super()
    }

    render() {
        let style = { backgroundColor: this.props.color };
        return (
            <li className="list-group-item" style={style}>
                {this.props.children}
                <span className="close" onClick={this.props.deleteNote}>x</span>
            </li>
        );
    }
}

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

    addNote() {
        let newNote = {
            id: Date.now(),
            text: this.state.text,
            color: this.props.color,
        };

        this.props.onAddNote(newNote);
        this.setState({
            text: ''
        });
    }

    render() {
        return (
            <div className="input-group">
                <input type="text"
                    className="form-control"
                    placeholder="Add Note"
                    value={this.state.text}
                    onChange={this.handleTextChange}
                    />
                <span className="input-group-btn">
                    <button
                        className="btn btn-primary"
                        type="button"
                        onClick={this.addNote}>
                        Add
                     </button>
                </span>
            </div>
        );
    }
}

class NotesGreed extends React.Component {
    constructor() {
        super()
    }

    render() {
        let style = {
            marginTop: "20px"
        }

        let notes = this.props.notes;

        return (
            <div>
                <ul className="list-group" style={style}>
                    {
                        notes.map((note, i) => {
                            return (
                                <Note
                                    key={note.id}
                                    color={note.color}
                                    deleteNote={this.props.onDelete.bind(null, note)}
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

class ColorPicker extends React.Component {
    constructor() {
        super();

        this.state = {
            color: 'orangered'
        }

        this.selectColor = this.selectColor.bind(this);
    }

    selectColor(e) {
        if (e.target.dataset.value) {
            var color = e.target.dataset.value;
            this.props.onSelectColor(color);
            this.setState({
                color: color
            });
        }
    }

    render() {
        return (
            <div className="color-picker" onClick={this.selectColor}>
                <div
                    className={"color color-red " + (this.state.color == 'orangered' ? 'success' : '')}
                    data-value="orangered">
                </div>
                <div
                    className={"color color-green " + (this.state.color == 'mediumspringgreen' ? 'success' : '')}
                    data-value="mediumspringgreen"></div>
                <div className={"color color-blue " + (this.state.color == 'deepskyblue' ? 'success' : '')}
                    data-value="deepskyblue"></div>
            </div>
        )
    }
}

class NotesApp extends React.Component {
    constructor() {
        super()

        this.state = {
            notes: [],
            color: 'orangered'
        }

        this.addNote = this.addNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
        this.selectColor = this.selectColor.bind(this);
    }

    componentDidMount() {
        let localNotes = JSON.parse(localStorage.getItem('notes'));
        if (localNotes) {
            this.setState({
                notes: localNotes,
            });
        }
    }

    componentDidUpdate() {
        this._updateLocalStorage();
    }

    _updateLocalStorage() {
        let notes = JSON.stringify(this.state.notes);
        localStorage.setItem('notes', notes);
    }

    selectColor(newColor) {
        this.setState( {
            color: newColor
        });
    }

    deleteNote(removingNote) {

        let notes = this.state.notes;
        let newNotes = notes.filter(note => {
            return removingNote.id !== note.id;
        });

        this.setState({
            notes: newNotes
        });
    }

    addNote(newNote) {
        let newNotes = this.state.notes;
        newNotes.push(newNote);

        this.setState({
            notes: newNotes
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h1>Оставьте Заметку</h1>
                        <ColorPicker onSelectColor={this.selectColor}></ColorPicker>
                        <NotesEditor onAddNote={this.addNote} color={this.state.color}></NotesEditor>
                        <NotesGreed
                            notes={this.state.notes}
                            onDelete={this.deleteNote}
                            ></NotesGreed>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <NotesApp></NotesApp>,
    document.getElementById('root')
);