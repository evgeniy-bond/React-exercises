var Note = React.createClass({
    render: function () {
        var style = { backgroundColor: this.props.color };
        return (
            <div className="note" style={style}>
                <span className="delete-note" onClick={this.props.onDelete}> × </span>
                {this.props.children}
            </div>
        );
    }
});

var NoteEditor = React.createClass({
    getInitialState: function () {
        return {
            text: '',
            color: 'orangered',
        };
    },

    handleTextChange: function (event) {
        this.setState({ text: event.target.value });
    },

    handleNoteAdd: function () {
        var newNote = {
            text: this.state.text,
            id: Date.now(),
            color: this.state.color
        };

        this.props.onNoteAdd(newNote);
        this.setState({ text: '' });
    },

    selectColor: function (value) {
        this.setState({ color: value });
    },

    render: function () {
        return (
            <div className="note-editor">
                <textarea
                    placeholder="Enter your note here..."
                    rows={5}
                    className="textarea"
                    value={this.state.text}
                    onChange={this.handleTextChange}
                    />
                <div className="app-menu">
                    <ColorPicker onSelectColor={this.selectColor} />
                    <button className="add-button" onClick={this.handleNoteAdd}>Add</button>
                </div>
            </div>
        );
    }
});

var ColorPicker = React.createClass({

    getInitialState: function () {
        return {
            color: 'orangered'
        }
    },

    selectColor: function (e) {
        if (e.target.dataset.value) {
            var color = e.target.dataset.value;
            this.props.onSelectColor(color);
            this.setState({
                color: color
            })
        }
    },

    render: function () {
        return (
            <div className="color-picker" onClick={this.selectColor}>
                <div
                    className={"color color-red " + (this.state.color == 'orangered' ? 'success' : '')}
                    data-value="orangered">
                </div>
                <div
                    className={"color color-green " + (this.state.color == 'mediumspringgreen' ? 'success' : '')}
                    data-value="mediumspringgreen">
                </div>
                <div
                    className={"color color-blue " + (this.state.color == 'deepskyblue' ? 'success' : '')}
                    data-value="deepskyblue">
                </div>
            </div>
        )
    }
});

var Search = React.createClass({

    handleSearch: function (e) {
        var localNotes = JSON.parse(localStorage.getItem('notes'));
        var searchQuery = e.target.value.toLowerCase();
        var displayedContacts = localNotes.filter(el => {
            var searchValue = el.text.toLowerCase();
            return searchValue.indexOf(searchQuery) !== -1;
        });

        this.props.onHandleSearch(displayedContacts);
    },

    render: function () {
        return (
            <form>
                <input type="search" onChange={this.handleSearch}/>
            </form>
        );
    }
});

var NotesGrid = React.createClass({
    componentDidMount: function () {
        var grid = this.refs.grid;
        this.msnry = new Masonry(grid, {
            itemSelector: '.note',
            columnWidth: 200,
            gutter: 10,
            isFitWidth: true
        });
    },

    componentDidUpdate: function (prevProps) {
        if (this.props.notes.length !== prevProps.notes.length) {
            this.msnry.reloadItems();
            this.msnry.layout();
        }
    },

    render: function () {
        var onNoteDelete = this.props.onNoteDelete;

        return (
            <div className="notes-grid" ref="grid">
                {
                    this.props.notes.map(function (note) {
                        return (
                            <Note
                                key={note.id}
                                onDelete={onNoteDelete.bind(null, note)}
                                color={note.color}>
                                {note.text}
                            </Note>
                        );
                    })
                }
            </div>
        );
    }
});

var NotesApp = React.createClass({
    getInitialState: function () {
        return {
            notes: []
        };
    },

    componentDidMount: function () {
        var localNotes = JSON.parse(localStorage.getItem('notes'));
        if (localNotes) {
            this.setState({ 
                notes: localNotes,
                displayedContacts: localNotes
         });
        }
    },

    componentDidUpdate: function () {
        this._updateLocalStorage();
    },

    handleNoteDelete: function (note) {
        var noteId = note.id;
        var newNotes = this.state.notes.filter(function (note) {
            return note.id !== noteId;
        });
        this.setState({ notes: newNotes});
    },

    handleNoteAdd: function (newNote) {
        var newNotes = this.state.notes.slice();
        newNotes.unshift(newNote);
        this.setState({ notes: newNotes,
            displayedContacts: ''    
         });
    },

    handleSearch: function(searchNotes) {
        this.setState({ displayedContacts: searchNotes });
    },

    render: function () {
        return (
            <div className="notes-app">
                <h2 className="app-header">NotesApp</h2>
                <Search onHandleSearch={this.handleSearch}></Search>
                <NoteEditor onNoteAdd={this.handleNoteAdd} />
                <NotesGrid notes={this.state.displayedContacts || this.state.notes} onNoteDelete={this.handleNoteDelete} />
            </div>
        );
    },

    _updateLocalStorage: function () {
        var notes = JSON.stringify(this.state.notes);
        localStorage.setItem('notes', notes);
    }
});

ReactDOM.render(
    <NotesApp />,
    document.getElementById('mount-point')
);