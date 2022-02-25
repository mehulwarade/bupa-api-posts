import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

/* CSS in JS Style */
const timeline = {
    liststyletype: "none",
    position: "relative",
}


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      posts: []
    }
    this.add = this.add.bind(this);
  }

  async add(){
    await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
    .then(res => {
        console.log(res.data);
        this.setState(() => ({
          posts: res.data,
        }));
    })
    .catch(err => {
        console.log(err);
    })
  }

  render(){
  return (
    <>
      <button onClick={this.add}>Click here</button>
      {this.state.posts.length > 0 &&
        <div>
          {this.state.posts.map((post, index) => {
            console.log(post.body);
            <div>{post.body}</div>
            })
          }
        </div>
      }
    </>
  )}
}

export default (App);