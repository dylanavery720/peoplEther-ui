import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3'
import _ from 'lodash'

var ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
var peopleContractABI = [{"constant":true,"inputs":[],"name":"getPeople","outputs":[{"name":"","type":"bytes32[]"},{"name":"","type":"bytes32[]"},{"name":"","type":"uint256[]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_firstName","type":"bytes32"},{"name":"_lastName","type":"bytes32"},{"name":"_age","type":"uint256"}],"name":"addPerson","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"people","outputs":[{"name":"firstName","type":"bytes32"},{"name":"lastName","type":"bytes32"},{"name":"age","type":"uint256"}],"payable":false,"type":"function"}]
var peopleContractAddress = '0x8067156a5d969917a019d4c04b1d0847fd8e473d'

class App extends Component {
  constructor(){
    super()
    this.state = {
      peopleContract: ETHEREUM_CLIENT.eth.contract(peopleContractABI).at(peopleContractAddress),
      firstNames: [],
      lastNames: [],
      ages: []
    }
  }

  componentDidMount() {
    var data = this.state.peopleContract.getPeople()
    this.setState({firstNames: String(data[0]).split(','), lastNames: String(data[1]).split(','), ages: String(data[2]).split(',')})
  }

  render() {
    var TableRows = []

    _.each(this.state.firstNames, (value, index) => {
      TableRows.push(
      <tr>
        <td>{ETHEREUM_CLIENT.toAscii(this.state.firstNames[index])}</td>
        <td>{ETHEREUM_CLIENT.toAscii(this.state.lastNames[index])}</td>
        <td>{this.state.ages[index]}</td>
      </tr>
      )
    })

    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to a dApp built with React</h2>
        </div>
        <div className="App-content">
          <pre>{this.state.firstNames}</pre>
          <pre>{this.state.lastNames}</pre>
          <pre>{this.state.ages}</pre>
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              {TableRows}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
