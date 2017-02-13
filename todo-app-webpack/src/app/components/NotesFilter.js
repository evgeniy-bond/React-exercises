let React = require('react');

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

module.exports = NotesFilter;