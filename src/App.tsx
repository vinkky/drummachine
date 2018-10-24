import * as React from "react";
import "./App.css";
import { TransportComponent } from "./components/transport.component";

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <TransportComponent />
      </div>
    );
  }
}

export default App;
