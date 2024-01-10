class React {
  static Component: any;
}





function useXxx(Comp) {
  return class WrappingComponent extends React.Component {
    didMount() {

    }
    didUnmount (){

    }
    render(){
        return <Comp {...this.props}>
    }
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { x: 1 };
  }

  onClick = () => {
    this.setState({
      x: this.state.x + 1,
    });
  };

  render() {
    return (
      <div className="App">
        App <button onClick={this.onClick}>+1</button>
        <B name={this.state.x}></B>
      </div>
    );
  }
}
