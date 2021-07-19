import React, { Component } from "react";
import Web3 from "web3";
import "./App.css";
import ERC721 from "../abis/ERC721.json";
import FileUpload from "./FileUpload";
import logo from "../ipfs_logo.png";
import { Card, CardDeck, Row } from "react-bootstrap";

import config from "../config.js";
const chainID = 97;
class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;

    // Load account
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    web3.eth.net.getNetworkType().then(console.log);
    const networkId = await web3.eth.net.getId();
    this.setState({ networkId: networkId });

    if (networkId == chainID) {
      const abi = ERC721.abi;

      const address = config.ERC721;
      const contract = await new web3.eth.Contract(abi, address);

      this.setState({ contract });

      const name = await contract.methods.name().call();

      const tokensArray = await contract.methods.getAllTokens().call();
      const lengthArray = await contract.methods.getLengthArrayTokens().call();
      for (var i = 0; i < lengthArray; i++) {
        let owner = await this.state.contract.methods
          .ownerOf(tokensArray[i])
          .call();
        let uri = await this.state.contract.methods
          .tokenURI(tokensArray[i])
          .call();
        this.setState({
          tokens: [
            ...this.state.tokens,
            { hash: tokensArray[i], owner: owner, uri: uri },
          ],
        });
      }

      console.log(this.state.tokens);
    } else {
      window.alert(
        "Please switch to the Smart Chain Testnet to continue using the app"
      );
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      contract: null,
      name_marketplace: 0,
      networkId: 0,
      tokens: [],
    };
  }

  render() {
    const { tokens } = this.state;

    return (
      <div>
        <nav
          className="navbar fixed-top  flex-md-nowrap p-0 shadow "
          style={{ backgroundColor: "orange" }}
        >
          <img src={logo} style={{ width: "60px", height: "60px" }} />
          <a style={{ color: "white" }}>NFT MARKETPLACE POWERED BY IPFS</a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className="text-white">
                <span id="account" style={{ color: "white" }}>
                  {" CONNECTED WALLET: "}
                  {this.state.account}
                </span>
              </small>
            </li>
          </ul>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div
                className="content mr-auto ml-auto"
                style={{ marginTop: "60px" }}
              >
                <h2>Mint New Token </h2>

                {this.state.networkId == 97 ? (
                  <FileUpload
                    contract={this.state.contract}
                    account={this.state.account}
                  />
                ) : (
                  <span>
                    Please make sure you are on Smart Chain Testnet <br /> you
                    may need to refresh after changing network
                  </span>
                )}
              </div>
            </main>
          </div>
          <hr />
        </div>
        <Row className="row row-spacer-sm d-flex flex-row flex-start flex-nowrap overflow-auto">
          {tokens.map((item) => {
            return (
              <Card style={{ width: "18rem", margin: "10px" }}>
                <Card.Img variant="top" src={item.uri} />
                <Card.Body>
                  <Card.Title>Owner : {item.owner}</Card.Title>
                  <Card.Text>
                    Token ID :<br />
                    {item.hash}
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Not for sale</small>
                </Card.Footer>
              </Card>
            );
          })}
        </Row>
      </div>
    );
  }
}

export default App;
