const CITIES = ['Chicago', 'New York', 'Tokyo', 'London', 'San Francisco', 'Amsterdam', 'Hong Kong'];

class Filter extends React.Component {
    constructor() {
        super();

        this.filterItem = this.filterItem.bind(this);
    }

    filterItem(e) {
        this.props.searchItem(e.target.value);
    }

    render() {
        return (
            <input
                type="search"
                placeholder="search"
                className="form-control"
                onChange={this.filterItem}
                />
        );
    }
}

class List extends React.Component {
    constructor() {
        super();
    }

    render() {
        let content,
            results;

        if (this.props.items.length > 0) {
            results = this.props.items.map((item, i) => {
                return <li key={i}>{item}</li>;
            });

            content = <ul>{results}</ul>;
        } else {
            content = <p>Совпадений нет</p>;
        }

        return (
            <div>
                <h4>Результат</h4>
                {content}
            </div>
        );
    }
}

class ListComponent extends React.Component {
    constructor() {
        super();

        this.state = {
            cities: CITIES,
            filterString: ''
        }

        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(value) {
        this.setState({
            filterString: value
        })
    }

    render() {
        let match;
        let displayedCities = this.state.cities.filter(item => {
            match = item.toLowerCase().indexOf(this.state.filterString.toLowerCase());
            return match !== -1;
        });

        return (
            <div>
                <Filter searchItem={this.handleSearch}></Filter>
                <List items={displayedCities || this.state.cities}></List>
            </div>
        );
    }
}

class App extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h1>Фильтр по поиску</h1>
                        <ListComponent></ListComponent>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <App></App>,
    document.getElementById('root')
);