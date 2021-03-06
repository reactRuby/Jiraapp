import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from './Post';
import EditComponent from './EditComponent';
import { normalize, schema } from 'normalizr';


class AllPost extends Component {

  constructor(props) {
    super(props);
    this.state = {project:[]};
  }

  componentDidMount() {
    console.log('ap-allJS', window.AP)
    window.AP.request('/rest/api/2/myself')
    .then(data => this.setState({project:data.body}))
    .catch(e => alert(e.err));
  }

  handle = () => {
    console.log(this.state.project);
    const data = {
      id: new Date(),
      title:'users',
      message: this.state.project,
      editing: false
     }


    const user = new schema.Entity('users');
    const mySchema = { users: [ user ] }
    const normalizedData = normalize(data, mySchema);

    this.props.dispatch({
      type: 'ADD_POST',
      data
      })
  }

  render() {
    return (
      <div>
        <h1 className="post_heading">All Posts</h1>
        {this.props.posts.map((post) => (
          <div key={post.id}>
            {post.editing ? <EditComponent post={post} key={post.id} /> : <Post post={post}
            key={post.id} />}
          </div>
        ))}
        <button className="delete" onClick={this.handle}>Projects</button>
        <button className="delete" onClick={this.handle}>Epics</button>
        <button className="delete" onClick={this.handle}>Release</button>
        <button className="delete" onClick={this.handle}>Users</button>
        <button className="delete" onClick={this.handle}>Tasks</button>
        <button className="delete" onClick={this.handle}>Subtasks</button>
        <button className="delete" onClick={this.handle}>Bugs</button>
        <button className="delete" onClick={this.handle}>Users</button>
        <button className="delete" onClick={this.handle}>Backlogs</button>
        <button className="delete" onClick={this.handle}>Sprint</button>
        <button className="delete" onClick={this.handle}>Labels</button>
        <button className="delete" onClick={this.handle}>Components</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
return {
posts: state
}
}
export default connect(mapStateToProps)(AllPost);
