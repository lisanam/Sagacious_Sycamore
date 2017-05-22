var needed = ['eating', 'playing', 'coding', 'sleeping'];

var firstIcons = {
    eating:'../../assets/food1.png',
    sleeping:'../../assets/sleep1.png',
    playing:'../../assets/love1.png',
    coding:'../../assets/code1.png'
}; 

var secondIcons = {
  eating:'../../assets/food2.png',
  sleeping:'../../assets/sleep2.png',
  playing:'../../assets/love2.png',
  coding:'../../assets/code2.png'
};

var logImg = {
  true: '../../assets/log2.png',
  false: '../../assets/log1.png'
};

class PetCommand extends React.Component {
    constructor(props){
      super(props);
    }

    render() {
      console.log(status)
      var Icons = needed.map((command, ind) => {
        return <img key={ind}
          className={this.props.disabled && command !== this.props.status ? 'command command-none' : 'command'}
          src={command === this.props.status ? secondIcons[command] : firstIcons[command]}
          onClick={this.props.disabled ? ()=> {} : () => {this.props.executeCommand(command)}}/>
      })
      Icons.push(<img className='command' src={logImg[this.props.displayLog]} 
            onClick={() => {this.props.showLog()}}/>)
      return (
        <div className="pet-commandbar">{Icons}</div> 
      );
    }
}

window.PetCommand = PetCommand;





