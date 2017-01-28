class Calculator extends React.Component {

    static get defaultProps() {
        return {
            result: Number
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            value1: Number,
            value2: Number,
            result: Number,
            isValidate: true
        }

        this.inputSetValue = this.inputSetValue.bind(this);
        this.sum = this.sum.bind(this);
        this.substr = this.substr.bind(this);
        this.mul = this.mul.bind(this);
        this.inputValidate = this.inputValidate.bind(this);
    }

    inputValidate(num) {

        if (isNaN(num)) {
            this.setState({ isValidate: false });
            return false;
        } else {
            this.setState({ isValidate: true });
            return num;
        }
    }

    inputSetValue(e) {
        let val = this.inputValidate(e.target.value);
        this.setState({result: ''})

        if (val) {
            val = parseFloat(val);

            if (e.target.dataset.value == 1) {
                this.setState({ value1: val });
            }
            if (e.target.dataset.value == 2) {
                this.setState({ value2: val });
            }
        }
    }

    sum(e) {
        e.preventDefault();
        let result = this.state.value1 + this.state.value2
        this.setState({ result });
    };

    substr(e) {
        e.preventDefault();
        let result = this.state.value1 - this.state.value2
        this.setState({ result });
    }

    mul(e) {
        e.preventDefault();
        let result = this.state.value1 * this.state.value2
        this.setState({ result });
    }

    render() {
        let result = this.state.result;
        let isValidate = this.state.isValidate;

        return (
            <div className="container">
                <form>
                    <input type="text"
                        placeholder='введите первое число'
                        onKeyPress={this.inputValidate}
                        onChange={this.inputSetValue}
                        className="form-control"
                        data-value='1'
                        />
                    <input type="text"
                        placeholder='введите второе число'
                        onKeyPress={this.inputValidate}
                        onChange={this.inputSetValue}
                        className="form-control"
                        data-value='2'
                        />
                    <div>
                        <button 
                        className="btn btn-default"
                        onClick={this.sum}
                        >+
                        </button>
                        <button 
                        onClick={this.substr}
                        className="btn btn-default"
                        >-
                        </button>
                        <button 
                        onClick={this.mul}
                        className="btn btn-default"
                        >*</button>
                    </div>
                </form>
                <p>Здесь будет ответ:
                    <span>{isValidate ? result : 'Введите коррректные числа'}</span>
                </p>
            </div>
        );
    }
}

ReactDOM.render(
    <Calculator></Calculator>,
    document.getElementById('root')
);


