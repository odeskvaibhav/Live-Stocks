import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';
import MuiPaper from 'material-ui/Paper';
import {Field, reduxForm} from 'redux-form';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Upload from 'material-ui-upload/Upload';
import UserInfo from './UserInfo';
import UserFiles from './UserFiles';
import CircularProgress from 'material-ui/CircularProgress';



// Home page component
class Home extends Component {
  constructor(props, context) {
      super(props, context);
      this.state = {
        step: 1,
        userId: null
      };
      this.styles = {
          
      }

      this.changeStep = this.changeStep.bind(this);
      this.fileUploaded = this.fileUploaded.bind(this);
  }

  changeStep(newStep, userId = null){

    if(newStep == 2){
      this.setState({
        userId: userId
      });
    }

    this.setState({
      step: newStep
    });
  }

  fileUploaded(data){
    
  }

  // render
  render() {
    return (
      <div className="page-home">
      	<div className="row">
      		<div className="col-md-6 col-md-offset-3 form-container">
	      		<MuiPaper className="paper container-padding">
		        	<div className="signup-form">
                <div className="text-center">
                  <img width="150" src="https://daks2k3a4ib2z.cloudfront.net/5746d4c4a3e009bb4d9ac858/5948c7ed90c11f0e5cc13de7_drip-capital-logo.png"/>
                </div>

                {this.state.step == 1 &&
                  <UserInfo changeStep={this.changeStep}/>
                }
                {this.state.step == 2 &&
                  <UserFiles changeStep={this.changeStep} fileUploaded={this.fileUploaded} userId={this.state.userId}/>
                }
                {this.state.step == 3 &&
                  <h4 className="text-center">
                  Your profile is complete
                  </h4>
                }
		        	</div>
		        </MuiPaper>
	        </div>
      	</div>
      </div>
    );
  }
}

Home.propTypes = {};

export default connect((state) => {return {}})(Home);