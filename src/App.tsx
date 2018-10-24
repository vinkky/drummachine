import * as React from "react";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";
import { TransportComponent } from "./components/transport.component";

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
