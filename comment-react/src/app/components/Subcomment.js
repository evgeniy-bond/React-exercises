let React = require('react');

class Subcomment extends React.Component {
    render() {
        return (
            <li className='list-group-item'>
                <div className='row'>
                    <div className='col-xs-2'>
                        <img alt='64x64' className='media-object' src='img/user-male.jpg' data-holder-rendered='true' />
                    </div>
                    <div className='col-xs-10'>
                        <h4 className='media-heading'>
                            <span>{this.props.author}: </span>{this.props.text}
                        </h4>
                        <div className='row'>
                            <div className='col-xs-8 col-xs-push-4 heart'>
                                <a href='#' className='like-counter'
                                    onClick={this.props.subLikesCounter}
                                >
                                    <i className='fa fa-heart' aria-hidden='true'></i>
                                    <span>&nbsp;{this.props.likes}</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        );
    }
}

module.exports = Subcomment;