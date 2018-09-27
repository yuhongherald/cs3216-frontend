import React, {PropTypes} from 'react';
import commentController from '../../controllers/commentController.js';
import Auth from '../../modules/Auth';
import {browserHistory} from "react-router";
import '../Events/css/Event.css';


class Comments extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            comments: false,
            add_comment: '',
            error: false
        }
        this.submitComment = this.submitComment.bind(this);
        this.onChange = this.onChange.bind(this);
        this.getData = this.getData.bind(this);
    }

    getData() {
        let data = {
            eid: this.props.eid
        };

        commentController.getComments(data).then(response => {
            console.log(response);
            if (response.status == 'success') {
                this.setState({
                    comments: JSON.parse(response.comments)
                });
            }
            else {
                this.setState({
                    error: response.desc
                });
            }
        });
    }

    onChange(event) {
        if (!Auth.getUserData()) {
            browserHistory.push('/login');
        }
        event.preventDefault();
        this.setState({add_comment: event.target.value})
    }

    formatDate(date) {
        return date.slice(0,10)
    }

    submitComment() {
        let postData = {
            eid: this.props.eid,
            content: this.state.add_comment,
            type: 0
        };
        commentController.createComment(postData).then(response => {
            if (response.status === 'success') {
                this.setState({
                    submissionSuccess: true,
                    add_comment: ''

                });
                this.getData();
            }
            else {
                this.setState({
                    submissionError: response.desc
                });
            }
        });
    }

    componentDidMount(){
        this.getData()
    }

    render() {

        if (this.state.comments && this.state.comments[0]) {
            let comments = this.state.comments;
            let listComments = comments.map((comment) =>
                <div className="comment-wrap">
                    <div className="comment-block">
                        <p className="comment-text">{comment.fields.content}</p>
                        <div className="bottom-comment">
                            <div className="comment-date">{this.formatDate(comment.fields.create_time)}</div>
                            {/*<ul className="comment-actions">*/}
                            {/*<li className="reply" style={{color: '#FF5A5F', fontWeight: 'bold'}}>Reply</li>*/}
                            {/*</ul>*/}
                        </div>
                    </div>
                </div>

            )
            return (
                <div>
                    <div className="comments">
                        <div className="comment-wrap">
                            <div className="comment-block">
                                <form>
                                    <textarea name="" id="" cols="30" rows="3"
                                              placeholder="Add comment..." onChange={this.onChange}
                                              value={this.state.add_comment} required/>
                                    <button type="button" className="submit-comment"
                                            style={{width: "50% !important", float: 'right'}}
                                            onClick={this.submitComment}>Submit
                                    </button>
                                </form>

                            </div>
                        </div>

                        {listComments}

                    </div>
                </div>
            )
        }
        else if (this.state.error) {
            return (
                <div>{this.state.error}</div>
            )

        }
        else {
            return (
                <div>
                    <div className="comments">
                        <div className="comment-wrap">

                            <div className="comment-block">
                                <form>
                                    <textarea name="" id="" cols="30" rows="3"
                                              placeholder="Add comment..." onChange={this.onChange}
                                              value={this.state.add_comment} required/>
                                    <button type="button" className="submit-comment"
                                            style={{width: "50% !important", float: 'right'}}
                                            onClick={this.submitComment}>Submit
                                    </button>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            )
        }

    }
}


export default Comments;