let React = require('react');

import ReactDOM from 'react-dom';

class CommentForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            authorIsEmpty: true,
            textIsEmpty: true,
            commentAuthor: props.commentAuthor
        };

        this.onFieldChange = this.onFieldChange.bind(this);
        this.addComment = this.addComment.bind(this);
    }

    addComment(e) {
        e.preventDefault();

        let author = ReactDOM.findDOMNode(this.refs.author);
        let text = ReactDOM.findDOMNode(this.refs.text);

        let newComment = {
            id: Math.random(),
            author: author.value,
            text: text.value,
            likes: 0,
            subcomments: []
        };

        this.props.addComment(newComment);

        this.setState({
            authorIsEmpty: true,
            textIsEmpty: true
        });

        author.value='';
        text.value='';
    }

    onFieldChange(fieldName, e) {
        if (e.target.value.trim().length > 0) {
            this.setState({ 
                ['' + fieldName]: false
             })
        } else {
            this.setState({ ['' + fieldName]: true })
        }
    }

    // componentWillReceiveProps() {
    //         //     this.setState({ text: `to ${this.props.commentAuthor}:` });
    //     this.refs.text.value = this.props.commentAuthor;
    // }

    render() {
        return (
            <div className="panel">
                <div className="panel-heading">Добавить комментарий</div>
                <div className="panel-body">
                    <div className="row">
                        <div className="col-xs-2">
                            <a href="#">
                                <img alt="64x64" className="media-object" src="img/user-male.jpg" data-holder-rendered="true" />
                            </a>
                        </div>
                        <div className="col-xs-10">
                            <div className="form-group">
                                <input type="text"
                                    className="form-control"
                                    placeholder="Your Name"
                                    ref="author"
                                    onChange={this.onFieldChange.bind(this, 'authorIsEmpty')}
                                />
                            </div>
                            <div className="form-group">
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    placeholder="Your Comment"
                                    ref="text"
                                    onChange={this.onFieldChange.bind(this, 'textIsEmpty')}
                                ></textarea>
                            </div>
                        </div>
                        <div className="col-xs-12 comments-footer">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={this.addComment}
                                disabled={this.state.authorIsEmpty || this.state.textIsEmpty}
                            >
                                Добавить комментарий
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = CommentForm;