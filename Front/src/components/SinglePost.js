import React from 'react';
import axios from 'axios';
import SingleReply from './singleReply';
import Message from './message.js'
import home from './home.js'


export default class SinglePost extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            reply: '',
            replyRefresh: this.props.item.reply,
            err: '',
            success:''
        };
      this.handelAddReply = this.handelAddReply.bind(this);
      this.handelReplyrefresh = this.handelReplyrefresh.bind(this);
      this.deleteMessage= this.deleteMessage.bind(this);
    }

    handelReplyrefresh(e){

      axios({
          method: 'post',
          url: 'http://localhost:4000/apiMessage/refresh',
          data: {id: e}
      }).then( result => {
        console.log(result);
          this.setState({
              replyRefresh: result.data.reply,
              err: {
                  replyText: ''
              },
              success: <Message text="Your reply posted" />
          });

      })

    }




    handelAddReply(e){
        e.preventDefault();
        if(!this.refs.replyText.value == ""){
        let  data1 = {
               replyText:  this.refs.replyText.value ,
               userName:  this.props.cName ,
               messageID: this.props.item._id
        }
        axios({
            method: 'post',
            url: 'http://localhost:4000/apiMessage/addReply',
            data: data1
        }).then( function (result ) {
            this.setState({
                err: {
                    replyText: ''
                },
                success: <Message text="Your reply posted" />
            });
            this.refs.replyText.value = '';
            // window.location.href = '/loggedIn';
            this.handelReplyrefresh(this.props.item._id);
        }.bind(this)).catch(function (error) {
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

    }

    deleteMessage(){

      axios({
          method: 'post',
          url: 'http://localhost:4000/apiMessage/delete',
          data: { id:this.props.del}

      }).then( window.location.href ="/loggedIn" )
    }



    render(){
            var replys = this.state.replyRefresh.map(function(item, key){
                return     <SingleReply item={item} key={key}  />
            });

            if (this.props.del){
        return (
            <div>
                <table className= "">
                  <tr className="bg-primary col-md-12"  >

                    <td className= "col-md-4">{this.props.item.text}<br/><button className="btn btn-danger btn-xs"  onClick= {this.deleteMessage} >Delete </button></td>
                    <td className= "col-md-1">{this.props.item.userName}</td>
                    <td className= "col-md-1">{this.props.item.createAt}</td><br/>
                  </tr>
                  <tr className="bg-secondary" >
                    <form onSubmit={this.handelAddReply} >
                    <textarea cols="90" name="replyText" ref="replyText" placeholder="Your reply"></textarea>
                    <button onClick='' >Reply</button><br/>
                    </form>
                  </tr>
                  <tr className="bg-info" >
                    {replys}
                  </tr>
                </table><br/><br/><br/>
            </div>
        );
      }
      else {
        return (
          <div  >
              <table className= "">
                <tr className="bg-primary col-md-12" >
                  <td className= "col-md-4">{this.props.item.text}</td>
                  <td className= "col-md-1">{this.props.item.userName}</td>
                  <td className= "col-md-1">{this.props.item.createAt}</td><br/>
                </tr>
                <tr className="bg-secondary"   >
                  <form onSubmit={this.handelAddReply} >
                  <textarea cols="90" name="replyText" ref="replyText" placeholder="Your reply"></textarea>
                  <button onClick='' >Reply</button><br/>
                  </form>
                </tr>
                <tr className= "bg-info" >
                  {replys}
                </tr>
              </table><br/><br/><br/>
          </div>
        )
      }
    }
}
