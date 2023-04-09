import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

/**
 * State declaration for <App />
 */
interface IState {
  data: ServerRespond[],
}

/**
 * The parent element of the react app.
 * It renders title, button and Graph react element.
 */
import React from 'react';
import PerspectiveViewer from '@finos/perspective-viewer';
import '@finos/perspective-viewer/dist/umd/material.css';
import './App.css';

interface IState {
  data: any[];
  showGraph: boolean;
}

class App extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      data: [],
      showGraph: false,
    };
  }

  componentDidMount() {
    this.getDataFromServer();
  }

  getDataFromServer = () => {
    fetch('http://localhost:8080/data')
      .then(response => response.json())
      .then(data => {
        this.setState({ data });
        setTimeout(this.getDataFromServer, 1000);
      });
  };

  startStreamingData = () => {
    this.setState({ showGraph: true });
  };

  renderGraph = () => {
    if (this.state.showGraph) {
      return (
        <PerspectiveViewer
          className="perspective-viewer"
          view="y_line"
          row-pivots='["timestamp"]'
          column-pivots='["stock"]'
          columns='["top_ask_price"]'
          aggregates='{"stock":"distinct count","top_ask_price":"avg","top_bid_price":"avg"}'
          data={this.state.data}
        />
      );
    }
  };

  render() {
    return (
      <div className="App">
        <h1>Stocks App</h1>
        <button onClick={this.startStreamingData}>Start Streaming Data</button>
        {this.renderGraph()}
      </div>
    );
  }
}

export default App;
