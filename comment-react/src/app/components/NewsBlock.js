let React = require('react');

class NewsBlock extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-xs-4">
                    <img src="img/Cover.jpg" alt="news" className="img-responsive" />
                </div>
                <div className="col-xs-8">
                    <div className="caption">
                        <h3>New Migos Album</h3>
                        <p>
                            New Migos Album is Great. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto
                            voluptatem dicta quos omnis provident expedita nobis, eveniet ipsam labore placeat. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, recusandae.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = NewsBlock;