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

var infoImg = {
  true: '../../assets/info2.png',
  false: '../../assets/info1.png'
};

class PetCommand extends React.Component {
    constructor(props){
      super(props);
    }

    render() {
      var Icons = needed.map((command, ind) => {
        return <img key={ind}
          className={this.props.disabled && command !== this.props.status ? 'col-md-2 command command-none' : 'col-md-2 command'}
          src={command === this.props.status ? secondIcons[command] : firstIcons[command]}
          onClick={this.props.disabled ? ()=> {} : () => {this.props.executeCommand(command)}}/>
      })

      Icons.push(<img className='col-md-2 command' src={logImg[this.props.displayLog]} 
          onClick={() => {this.props.switch('displayLog')}}/>)
      Icons.push(<img className='col-md-2 command' src={infoImg[this.props.displayInfo]} 
          onClick={() => {this.props.switch('displayInfo')}}/>)


      return (
        <div className="pet-commandbar">{Icons}</div> 
      );
    }
}

window.PetCommand = PetCommand;





