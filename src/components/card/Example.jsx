import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);

    // We declare the state as shown below
    this.state = {
      x: "This is x from state",
      y: "This is y from state",
      isToggleOn: true,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((prevState) => ({ isToggleOn: !prevState.isToggleOn }));
  }

  render() {
    let x1 = this.state.x;
    let y1 = this.state.y;

    return (
      <div>
        <h1>{x1}</h1>
        <h2>{y1}</h2>
        <button
          type="button"
          className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
          onClick={this.handleClick}
        >
          {this.state.isToggleOn ? "ON" : "OFF"}
        </button>
      </div>
    );
  }
}
export default App;
