import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions';

class PostsIndex extends Component {
    componentDidMount() {
        this.props.fetchPosts();
    }

    renderPosts() {
       return _.map(this.props.posts, post => {
           return (
               <li className='list-group-item' key={post.id}>
                   {post.title}
               </li>
           );
       });
    }

    render() {
        return (
            <div>
                <div className='text-xs-right'>
                    <Link className='btn btn-primary' to='/posts/new'>
                        Add a Post
                    </Link>
                </div>
                <h3>Posts</h3>
                <ul className='list-group'>
                    {this.renderPosts()}
                </ul>
            </div>
        );
    }
}

//whenever we want to consume anything from application level state, we always define our mapStateToProps function. 
function mapStateToProps(state) {
    return { posts: state.posts };
}

export default connect(null, { fetchPosts }) (PostsIndex);