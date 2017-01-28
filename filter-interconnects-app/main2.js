const CITIES = ['Chicago', 'New York', 'Tokyo', 'London', 'San Francisco', 'Amsterdam', 'Hong Kong'];

class Filter extends React.Component {
    constructor() {
        super()

        this.searchItem = this.searchItem.bind(this);
    }

    searchItem(e) {
        this.props.onUpdateItems(e.target.value);
    }

    render() {
        return (
            <input
                type="search"
                placeholder="search"
                className="form-control"
                onChange={this.searchItem}
                />
        )
    }
}

class List extends React.Component {
    constructor() {
        super()

        this.state = {
            cities: CITIES,
            displayedCities: ''
        }

        this.updateItems = this.updateItems.bind(this);
    }

    updateItems(value) {
        this.setState({
            displayedCities: value
        })
    }

    render() {
        let content,
            match;

        content = this.state.cities.map((item, i) => {
            match = item.toLowerCase().indexOf(this.state.displayedCities.toLowerCase());
            if (match != -1) {
                return <li key={i}>{item}</li>;
            }
        });

        if (content.length > 0) {
            content = <ul>{content}</ul>
        } else {
            content = <p>Совпадений не найдено</p>
        }

        return (
            <div>
                <Filter onUpdateItems={this.updateItems}></Filter>
                <h4>Результаты</h4>
                {content}
            </div>
        );
    }
}

class App extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h1>Фильтр по поиску</h1>
                        <List></List>
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