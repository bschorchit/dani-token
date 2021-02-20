import React, { Component } from "react";
import daniTokenArtifact from "./contracts/DaniToken.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      totalSupply: 0, 
      web3: undefined, 
      accounts: undefined, 
      daniToken: undefined,
      balanceOf: 0,
    }
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = daniTokenArtifact.networks[networkId];
      const _daniToken = new web3.eth.Contract(
        daniTokenArtifact.abi,
        deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      
      const _totalSupply = await _daniToken.methods.totalSupply().call();
      const _balanceOf = await _daniToken.methods.balanceOf(accounts[0]).call();
      this.setState({ totalSupply: _totalSupply, web3: web3, accounts: accounts, daniToken: _daniToken, balanceOf: _balanceOf });

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    //const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    //await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await this.contract.methods.totalSupply().call();

    // Update state with the result.
    //this.setState({ storageValue: response });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Feliz Aniversário, Dani!</h1>
        <div>De presente, foram criadas ao todo {this.state.totalSupply} moedas digitais $DANIs</div>
        <div>Você possui {this.state.balanceOf} moedas $DANIs </div>
        <p>Beijos, Bárbara :* </p>
      </div>
    );
  }
}

export default App;
