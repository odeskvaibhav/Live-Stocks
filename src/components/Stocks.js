import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';
import MuiPaper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import LinearProgress from 'material-ui/LinearProgress';
import TimeAgo from 'react-timeago';



// Home page component
class Stocks extends Component {
  constructor(props, context) {
      super(props, context);
      this.state = {
        prices: []
      };
      this.styles = {
          
      }
  }

  componentDidMount(){
    let _this = this;
    var connection = new WebSocket('ws://stocks.mnet.website');
  
    // Log messages from the server
    connection.onmessage = function (e) {

      let oldPrices = {};
      _this.state.prices.map(function([name, price], index) {
        oldPrices[name] = {
                            'price': price,
                            'time': new Date()
                          }
      });



      let total = 0;
      let prices = JSON.parse(e.data).sort();      
      let max = 0;

      prices.map(function([name, price], index) {
        total = total + price;
        if(price > max){
          max = price;
        }
      });

      let average = total / prices.length;


      _this.setState({
        prices,
        total,
        average,
        max,
        oldPrices
      });
    };
  }

  // render
  render() {
    let prices = this.state.prices;
    let oldPrices = this.state.oldPrices;
    return (
      <div className="page-home">
      	<div className="row">
      		<div className="col-md-6 col-md-offset-3 form-container">
	      		<MuiPaper className="paper container-padding">
		        	<div className="signup-form">
                <div className="text-center">
                  <img width="150" src="https://imgee.s3.amazonaws.com/imgee/c7e342aada624fb3aa4841b73ba7c5fa.png"/>
                </div>

                <div>
                  <Table>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                      <TableRow>
                        <TableHeaderColumn>
                          Stock Name
                        </TableHeaderColumn>
                        <TableHeaderColumn>
                          Price
                        </TableHeaderColumn>
                        <TableHeaderColumn>
                          Updated
                        </TableHeaderColumn>
                      </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                      {prices.map( ([name, price], index) => (
                        <TableRow key={index}>
                          <TableRowColumn>{name}</TableRowColumn>
                          <TableRowColumn>
                                <div>{price}</div>
                                <LinearProgress color={oldPrices[name] && price < oldPrices[name].price ? 'red' : 'green'} style={{'height': '10px'}} mode="determinate" max={this.state.max} value={price} />
                          </TableRowColumn>
                          <TableRowColumn>
                                <TimeAgo date={oldPrices[name] && oldPrices[name].time !== undefined ? oldPrices[name].time : new Date()}/>
                          </TableRowColumn>
                        </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
		        	</div>
		        </MuiPaper>
	        </div>
      	</div>
      </div>
    );
  }
}

Stocks.propTypes = {};

export default connect((state) => {return {}})(Stocks);