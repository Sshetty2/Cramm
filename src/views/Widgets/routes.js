import React, { Component } from 'react';
import { IndexRoute, Router, Route } from 'react-router-dom';

import App from './containers/App';
import Posts from './containers/Posts';
import AddPost from './containers/AddPost';

import * as firebase from "firebase";
import config from './containers/App/firebase-config';

export default class ChatBoardRoutes extends Component{
  constructor() {
    super();

    // Initialize Firebase
    firebase.initializeApp(config);
  }

  state = {
    posts: [],
    loading: true
  };

  componentWillMount() {
    let postsRef = firebase.database().ref('posts');

    let _this = this;

    postsRef.on('value', function(snapshot) {
      _this.setState({
        posts: snapshot.val(),
        loading: false
      });
    });
  }
  render() {
    return (
      <React.Fragment>
        <Posts 
          firebase = {firebase.database()}
          posts= {this.state.posts}
          loading= {this.state.loading} 
        />
        <AddPost
          firebase = {firebase.database()}
          posts= {this.state.posts}
          loading= {this.state.loading} 
          />
      </React.Fragment>
      );
    }
}


