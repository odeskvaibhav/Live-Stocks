import React, {PropTypes, Component} from 'react';
import "../stylesheets/main.scss";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// app component
export default class App extends React.Component {
  // render
  render() {
  	const muiTheme = getMuiTheme({
      
    });
    return (
      <div className="main-body">
      	<div className="container">
	      <MuiThemeProvider {...this.props} muiTheme={muiTheme}>
	        {this.props.children}
	      </MuiThemeProvider>
	    </div>
      </div>
    );
  }
}
