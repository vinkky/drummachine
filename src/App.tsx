import * as React from "react";
import { Provider } from "react-redux";
import "./App.css";
import  TransportComponent  from "./components/transport.component";
import store from "./store";

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
      <div className="App">
        <TransportComponent />
      </div>
      </Provider>

    );
  }
}

export default App;
