let React = require('react');

import Subcomment from './Subcomment';

class Comment extends React.Component {
    render() {
        let Subcomments = this.props.subcomments;

        if (Subcomments.length > 0) {
            Subcomments = Subcomments.map(item => {
                return (
                    <Subcomment
                        key={item.id}
                        author={item.author}
                        text={item.text}
                        likes={item.likes}
                        subLikesCounter={this.props.subLikesCounter.bind(null,item.id)}
                    ></Subcomment>
                );
            })
        } else {
            Subcomments = '';
        }

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
                            <div className='col-xs-4'>
                                <a href='#'
                                    className='response'
                                    onClick={this.props.setSubcomment}
                                >
                                    Ответить
                                </a>
                            </div>
                            <div className='col-xs-8 heart'>
                                <a
                                    href='#'
                                    className='like-counter'
                                    onClick={this.props.likesCounter}
                                >
                                    <i
                                        className='fa fa-heart'
                                        aria-hidden='true'
                                    >
                                    </i>
                                    <span>&nbsp;{this.props.likes}</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <ul>
                    {Subcomments}
                </ul>
            </li>
        );
    }
}

module.exports = Comment;