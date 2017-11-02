import React from 'react';


export default class SingleReply extends React.Component {
    constructor(props){
        super(props);



    }




    render(){
        return (
            <tr className= " col-md-12">
              <td className= "col-md-4">{this.props.item.replyText}</td>
              <td className= "col-md-1">{this.props.item.userName}</td>
              <td className= "col-md-1">{this.props.item.createAt}</td>
            </tr>
        );
    }
}
