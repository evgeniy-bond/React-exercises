var Timer = React.createClass({
    getInitialState: function () {
        return {
            seconds: 0,
            go: true
        };
    },

    componentDidMount: function () {
        this.timer = setInterval(this.tick, 1000);
    },

    tick: function () {
        this.setState({ seconds: ++this.state.seconds  });
    },

    componentWillUnmount: function () {
        clearInterval(this.timer);
    },

    start: function () {
        clearInterval(this.timer);
        this.setState({
            seconds: 0,
            go: true
        });
        this.timer = setInterval(this.tick, 1000);
    },

    pause: function () {
        clearInterval(this.timer);
        this.setState({ go: false });
    },

    continue: function () {
        this.timer = setInterval(this.tick, 1000);
    },

    render: function () {
        return (
            <div className="container">
                <h4> Уже прошло {this.state.seconds} секунд </h4>
                <button
                    onClick={this.continue}
                    className={this.state.go ? 'none' : ''}
                    >Старт
                </button>

                <button
                    onClick={this.pause}
                    className={this.state.go ? '' : 'none'}
                    >Пауза
                </button>

                <button onClick={this.start}>Заново</button>
            </div>
        );
    }
});

ReactDOM.render(
    <Timer />,
    document.getElementById('mount-point')
);