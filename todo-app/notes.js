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

class NotesFilter extends React.Component {
    constructor() {
        super();

        this.state = {
            buttons: ['active', '', '']
        }

        this.activeButton = this.activeButton.bind(this);
    }

    activeButton(e) {
        let buttons = this.state.buttons;
        let newButtons = buttons.map((btn, i) => {

            btn = '';
            if (i == e.target.dataset.button) btn = 'active';

            return btn;
        });

        this.setState({
            buttons: newButtons
        });
    }

    render() {
        let buttons = this.state.buttons;


        let filterButtons = buttons.map((btn, i) => {

            var callback;
            var text;

            if (i == 0) {
                callback = this.props.showAllTasks;
                text = "All";
            } else if (i == 1) {
                callback = this.props.showActiveTasks;
                text = "Active";
            } else {
                callback = this.props.showCompletedTasks;
                text = "Completed";
            }

            return (
                <li
                    role="presentation"
                    className={this.state.buttons[i]}
                    key={i}
                >
                    <a href="#"
                        onClick={callback}
                        data-button={i}
                    >
                        {text}
                    </a>
                </li>
            );
        });

        return (
            <ul
                className="nav nav-pills nav-justified"
                onClick={this.activeButton}
            >
                {filterButtons}
            </ul>
        );
    }
}

class NotesApp extends React.Component {
    constructor() {
        super()

        this.state = {
            notes: [],
            showingNotes: []
        }

        this.addNote = this.addNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
        this.doneTask = this.doneTask.bind(this);
        this.showAllTasks = this.showAllTasks.bind(this);
        this.showActiveTasks = this.showActiveTasks.bind(this);
        this.showCompletedTasks = this.showCompletedTasks.bind(this);
    }

    componentDidMount() {
        let localNotes = JSON.parse(localStorage.getItem('notes'));
        if (localNotes) {
            this.setState({
                notes: localNotes,
                showingNotes: localNotes
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

    deleteNote(removingNote) {

        let notes = this.state.notes;
        let newNotes = notes.filter(note => {
            return removingNote.id !== note.id;
        });

        this.setState({
            notes: newNotes,
            showingNotes: newNotes
        });
    }

    addNote(newNote) {
        let newNotes = this.state.notes;
        newNotes.push(newNote);

        this.setState({
            notes: newNotes,
            showingNotes: newNotes
        });
    }

    doneTask(doneNote) {
        let notes = this.state.notes;
        let newNotes = notes.map(note => {
            if (doneNote.id == note.id) note.done = !note.done;
            return note;
        });

        this.setState({
            notes: newNotes,
            showingNotes: newNotes
        });
    }

    showAllTasks(e) {
        e.preventDefault();

        this.setState({
            showingNotes: this.state.notes
        });
    }

    showActiveTasks(e) {
        e.preventDefault();

        let notes = this.state.notes;
        let newNotes = notes.filter(note => {
            return !note.done;
        });

        this.setState({
            showingNotes: newNotes
        });
    }

    showCompletedTasks(e) {
        e.preventDefault();

        let notes = this.state.notes;
        let newNotes = notes.filter(note => {
            return note.done;
        });

        this.setState({
            showingNotes: newNotes
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h1>To Do List</h1>
                        <NotesEditor onAddNote={this.addNote}></NotesEditor>
                        <NotesGreed
                            notes={this.state.showingNotes}
                            onDelete={this.deleteNote}
                            onDoneTask={this.doneTask}
                        >
                        </NotesGreed>
                        <NotesFilter
                            showAllTasks={this.showAllTasks}
                            showActiveTasks={this.showActiveTasks}
                            showCompletedTasks={this.showCompletedTasks}
                        ></NotesFilter>
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