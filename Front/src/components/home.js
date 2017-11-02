import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import Message from './message.js'
import SinglePost from './SinglePost.js'

axios.defaults.withCredentials = true;

class Home extends React.Component{
  constructor(props){
    super(props);

    this.state = {

              showName: '',
              showID: '',
              showList: [],
              err: {
                  text: ''
              }
    }
    this.hldRefresh = this.hldRefresh.bind(this)
    this.hdlAddPost = this.hdlAddPost.bind(this);
    this.hdlLogout  = this.hdlLogout.bind(this);

    axios({
        method: 'get',
        url: 'http://localhost:4000/api/loggedIn'
    }).then(function (result){

        this.setState({showName: result.data.userName , showID: result.data._id });
    }.bind(this)).catch(err=>

        window.location.href = '/'
    );
    this.hldRefresh();

 }


 hdlAddPost(e){
     e.preventDefault();
     let  data1 = {
         text:  this.refs.text.value ,
          userName:  this.state.showName ,
          userID: this.state.showID
     }
     axios({
         method: 'post',
         url: 'http://localhost:4000/apiMessage/makeMessage',
         data: data1
     }).then( result => {
         this.setState({
             err: {
                 text: ''
             },
             success: <Message text="Your message posted" />
         });
         this.refs.text.value = '';

     }).then(this.hldRefresh).catch(function (error) {
          if (error.response) {
              console.log(error.response.data)
              let mainErrors = error.response.data.errors,
                  err_msg = {
                     text: mainErrors.text ? mainErrors.text.msg : ''
                  };
              this.setState({
                  err: err_msg,
                  success: ''
              });
          }
      }.bind(this));


 }






 hldRefresh(){

     axios({
       method: 'get',
       url: 'http://localhost:4000/apiMessage/loggedIn/',
       data: {}
     })
     .then(function (response) {
         this.setState({
             showList : response.data

         });

     }.bind(this))
     .catch(function (error) {
         console.log(error);
     });
 }


 hdlLogout(){
     axios({
         method: 'get',
         url: 'http://localhost:4000/api/logout',
     }).then( result => {
         window.location.href = '/';
     }).catch(error => console.log(error));
 }


  render(){
        var posts = this.state.showList.map(function(item, key){

          if (this.state.showID == item.userID){
            return     <SinglePost item={item} key={key}  cName ={this.state.showName}  del={item._id}  />
          }
          else {
            return     <SinglePost item={item} key={key}  cName ={this.state.showName}  />
            }


        }.bind(this));

    return(
      <div>
        <h3>
          Welcome:
          {this.state.showName}
        </h3>
        <div className="col col-md-7">
            <h1>Write a new message</h1>

            <div><button className="btn btn-warning btn-xs"   onClick={this.hdlLogout}>Logout</button></div>
            <br/>
            {this.state.success}
            <form onSubmit={this.hdlAddPost}>
                <div className="form-group">
                    <textarea   cols="100"  rows="5" name="text" ref="text" placeholder="Your message"
                    ></textarea>
                    <p className="text-danger">{this.state.err.text}</p>
                </div>
                <input type="submit" className="btn btn-success" value="Post" />
            </form>
        </div>

          <div className="col col-md-6" >
            <h2>All Messages:</h2>

                {posts}

          </div>
        </div>
    )
  }
}

export default Home;
