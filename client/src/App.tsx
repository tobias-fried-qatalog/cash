import React from "react";
import InMemoryCacher from "./components/InMemoryCacher";
import Toggle from "./components/Toggle";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h3>Fun with Queries</h3>

        <Toggle label="useQuery Table">
          <InMemoryCacher />
        </Toggle>
      </header>
    </div>
  );
}

export default App;
