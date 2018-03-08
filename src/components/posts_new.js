import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
    renderField(field) {
        const { meta: {touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;

        return (
            <div className={className}>
                <label >{field.label}</label>
                <input 
                    className='form-control'
                    type='text'
                    {...field.input}
                />
                <div className='text-help'>
                {touched ? error: ''} 
                </div>
            </div>
        );
    }

    onSubmit(values) {
        this.props.createPost(values, () => {
           this.props.history.push('/');
        });           
    }

//generalize renderField() function
//then rendered the fields
    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field 
                    label='Title For Posts'
                    name='title'
                    component={this.renderField}
                />
                <Field 
                    label='Categories'
                    name='categories'
                    component={this.renderField}
                />
                <Field 
                    label='Post Content'
                    name='content'
                    component={this.renderField}
                />
                <button type='submit' className='btn btn-primary'>Submit</button>
                <Link to='/' className='btn btn-danger'>Cancel</Link>
            </form>
        );
    }
} 

function validate(values){
    //console.log(value) -> { title: 'asdf', categories: 'asdf', content: 'asdf'}
    const errors = {};

    //validate the inputs from 'values'
    if(!values.title) {
        errors.title = "Enter a title";
    }
    if(!values.categories) {
        errors.categories = 'Enter some categories';
    }
    if(!values.content) {
        errors.content = 'Enter some content please';
    }

    //if erros is empty, the form is fine to submit
    //if errors has *any* properties, redux form assumes form is invalid 
    return errors;
}


// The field component is used to represent a distinct input that will be on the screen and visiable to our users.
// The name property represents what piece of state this "field" is going to produce

export default reduxForm({
    validate,
    form: 'PostsNewForm'
}) (
    connect(null, { createPost }) (PostsNew)
);

