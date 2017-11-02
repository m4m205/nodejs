import React from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

export default class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: {
                email: '', password: ''
            },
            err: {
                email: '', password: ''
            }
        };

        this.handelLogin = this.handelLogin.bind(this);
        this.handelCollect = this.handelCollect.bind(this);
    }

    handelLogin(info){
      info.preventDefault();
      let  data1 = {
          email:  this.refs.email.value , password:  this.refs.password.value
      }
      axios({
          method: 'post',
          url: 'http://localhost:4000/api/register/',
          data: data1
      }).then( result => {
          window.location.href = '/loggedIn';
          // /loggedIn in in front-end
      }).catch(function (error) {
           if (error.response) {
              // console.log(error.response.data);
               let mainErrors = error.response.data.errors,
                   err_msg = {
                      email: mainErrors.email ? mainErrors.email.msg : '',
                      password: mainErrors.password ? mainErrors.password.msg : ''
                   };
               this.setState({
                   err: err_msg
               });
           }
       }.bind(this));
  }
  handelCollect(el){
    var formData = this.state.data;
    formData[el.target.name] = el.target.value;
    this.setState({
        data: formData
    });
  }



    render(){
        return (
          <div className="col col-md-4" >
            <h2>LogIn: </h2>
            <form onSubmit={this.handelLogin}>
                <div className="form-group">
                    <input type="text"  className="form-control" name="email" ref="email" placeholder="Email" />
                    <p className="text-danger">{this.state.err.email}</p>
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" name="password" ref="password" placeholder="Password" />
                    <p className="text-danger">{this.state.err.password}</p>
                </div>
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
          </div>

        );
    }
}
