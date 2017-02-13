let React = require('react');

import Note from './Note';
import NotesEditor from './NotesEditor';
import NotesFilter from './NotesFilter';
import NotesGreed from './NotesGreed';

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

module.exports = NotesApp;