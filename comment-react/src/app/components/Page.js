let React = require('react');

import Header from './Header';
import Aside from './Aside';
import Main from './Main';

class Page extends React.Component {

    render() {
        return (
            <div className="container">
                <Header></Header>
                <div className="row">
                    <Aside></Aside>
                    <Main></Main>
                </div>
            </div>
        );
    }
}

module.exports = Page;