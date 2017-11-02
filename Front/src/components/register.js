import React from 'react';
import axios from 'axios';
import Message from './message'

export default class Register extends React.Component {

    constructor(props){
        super(props);
        this.state = {

            err: {
                userName: '',email: '', password: '', conf_password: ''
            },
            success: ''
        };

        this.handelRegister = this.handelRegister.bind(this);

    }

    handelRegister(info){
      info.preventDefault();
        let data1= {
              userName:   this.refs.userName.value,
              email:  this.refs.email.value,
              password: this.refs.password.value,
              conf_password: this.refs.conf_password.value
          }
        axios({
            method: 'put',
            url: 'http://localhost:4000/api/register',
            data: data1
        }).then( result => {
            this.setState({

                err: {
                    userName:   '',
                    email:  '',
                    password: '',
                    conf_password: ''
                },
                success: <Message text="Thanks for registration, you can login now!" />
            });
            this.refs.userName.value = '';
            this.refs.email.value = '';
            this.refs.password.value = '';
            this.refs.conf_password.value = '';

            }).catch(function (error) {
                 if (error.response) {

                     let mainErrors = error.response.data.errors;

                     let err_msg = {
                           userName: mainErrors.userName ? mainErrors.userName.msg : '',
                            email: mainErrors.email ? mainErrors.email.msg : '',
                            password: mainErrors.password ? mainErrors.password.msg : '',
                            conf_password: mainErrors.conf_password ? mainErrors.conf_password.msg : ''
                         };
                     this.setState({
                         err: err_msg,
                         success: ''
                     });
                 }
             }.bind(this));

    }



    render(){
        return (
          <div className="col col-md-4" >
            <h2>Register: </h2>
            {this.state.success}
            <form onSubmit={this.handelRegister}>
                <div className="form-group">
                    <input type="text"  className="form-control" name="userName" ref="userName" placeholder="Full name" />
                    <p className="text-danger">{this.state.err.userName}</p>
                </div>
                <div className="form-group">
                    <input type="text"  className="form-control" name="email" ref="email" placeholder="Email" />
                    <p className="text-danger">{this.state.err.email}</p>
                </div>
                <div className="form-group">
                    <input type="password"  className="form-control" name="password" ref="password" placeholder="Password" />
                    <p className="text-danger">{this.state.err.password}</p>
                </div>
                <div className="form-group">
                    <input type="password"  className="form-control" name="conf_password" ref="conf_password" placeholder="re-type Password" />
                    <p className="text-danger">{this.state.err.conf_password}</p>
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
          </div>
        )
    }
}
