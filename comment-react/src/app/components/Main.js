let React = require('react');

import NewsBlock from './NewsBlock';
import Comment from './Comment';
import CommentForm from './CommentForm';

var comments = [
    {
        id: Math.random(),
        author: 'Vasya',
        text: 'Lorem ipsum lala',
        likes: 2,
        subcomments: [{
            id: Math.random(),
            author: 'Masha',
            text: 'Lorem ipsum lala',
            likes: 2,
        },
        {
            id: Math.random(),
            author: 'Masha',
            text: 'Lorem ipsum lala',
            likes: 2,
        }]
    }, {
        id: Math.random(),
        author: 'Petya',
        text: 'lala Lorem ipsum ',
        likes: 0,
        subcomments: []
    }
];

class Main extends React.Component {
    constructor() {
        super();

        this.state = {comments};
        this.setSubcommentId = '';
        this.state.commentAuthor = '';

        this.addComment = this.addComment.bind(this);
        this.setSubcomment = this.setSubcomment.bind(this);
        this.likesCounter = this.likesCounter.bind(this);
        this.subLikesCounter = this.subLikesCounter.bind(this);
    }

    addComment(comment) {
        let newComments = this.state.comments;
        let id = this.setSubcommentId;

        if (!id) {
            newComments.push(comment);
        } else {
            newComments.forEach(item => {
                if (item.id == id) {
                    item.subcomments.push(comment);
                }
            });
        }

        this.setState(newComments);
        this.setSubcommentId = '';
        this.setState({commentAuthor: ''})
    }

    setSubcomment(id, e) {
        e.preventDefault();
        this.setSubcommentId = id;

        let сomments = this.state.comments;
        let commentAuthor;

        comments.forEach(comment => {
            if (comment.id == id) commentAuthor = comment.author;
        });

        this.setSubcommentId = id;
        this.setState({commentAuthor: commentAuthor});
    }

    likesCounter(id, e) {
        e.preventDefault();
        let comments = this.state.comments;

        comments.forEach(comment => {
            if (comment.id == id) ++comment.likes;
        })

        this.setState(comments);
    }

    subLikesCounter(id1, id2, e) {
        e.preventDefault();
        let comments = this.state.comments;

        comments.forEach(comment => {
            if (comment.id == id1) {
                comment.subcomments.forEach(subcomment => {
                    if (subcomment.id == id2)  ++subcomment.likes;
                });
            }
        })

        this.setState(comments);
    }

    render() {
        let comments = this.state.comments;

        let counter = comments.reduce((prev, cur) => prev + cur.subcomments.length, 0) + comments.length;
        let message = (counter == 1) ? `1 comment` : `${counter} comments`;

        return (
            <div className="col-xs-9">
                <h2>News</h2>
                <NewsBlock></NewsBlock>
                <div className="panel panel-default comments">
                    <div className="panel-heading">{message}</div>
                    <div className="panel-body">
                        <ul className="list-group">
                            {
                                comments.map(item => {
                                    return (
                                        <Comment
                                            key={item.id}
                                            author={item.author}
                                            text={item.text}
                                            likes={item.likes}
                                            subcomments={item.subcomments}
                                            likesCounter={this.likesCounter.bind(null, item.id)}
                                            subLikesCounter={this.subLikesCounter.bind(null, item.id)}
                                            setSubcomment={this.setSubcomment.bind(null, item.id)}
                                        >
                                        </Comment>
                                    );
                                })
                            }
                        </ul>
                    </div>
                    <CommentForm
                        addComment={this.addComment}
                        addSubcomment={this.addSubcomment}
                        commentAuthor={this.state.commentAuthor}
                    ></CommentForm>
                </div>
            </div>
        );
    }
}

module.exports = Main;