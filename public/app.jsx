class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: null,
      mood: null,
      level: 0,
      phys: null,
      img: null,
      status: null,
      health: 0,
      experience: 0,
      feed: 0,
      love: 0,
      showNewName: false,
      displayLog: false,
      disabled: false,
      logs: []
    }

    var that = this;
    setInterval(function() {
      if (that.state.status !== 'dead') {      
        that.getCurrent();
        that.getLog();
      }
    }, 2000);
  }

  componentWillMount() {
    this.getCurrent();
    this.getLog();
  }

  getCurrent() {
    console.log('Fetching pet status...');
    var that = this;
    fetch('http://localhost:3000/api/pet', {method: 'GET'})
      .then(function(parse) {
      parse.json()
        .then(function (data) {
          that.setState({
            name: data.name, 
            mood: data.mood, 
            level: data.level, 
            phys: data.phys, 
            img: data.img,
            health: data.health,
            experience: data.experience,
            feed: data.feed,
            status: data.status,
            love: data.love,
            showNewName: false,
            newPetName: '',
            disabled: data.disabled
          });
        });
    });
  }

  showLog() {
    this.setState({
      displayLog: !this.state.displayLog
    });
  }

  getLog() {
    console.log('Fetching log messages...');
    var that = this;
    fetch('http://localhost:3000/log', {method: 'GET'})
      .then(function(parse) {
        parse.json()
        .then(function (data) {
          that.setState({
            logs: data
          });
        });
    });
  }

  setStatus(status) {
    var that = this;
    this.setState({
      disabled: true
    });
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/api/pet',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data: {status: status}
    })
    .success(function() {
      console.log('Pet status updated!');
      that.getCurrent();
    })
  }

  getInput(event) {
    var key = event.target.getAttribute('class');
    var value = event.target.value;
    var obj = {};
    obj[key] = value;
    this.setState(obj);
  }

  showNameInput(){
    this.setState({
      showNewName: !this.showNewName
    });
  }

  newPet(e) {
    e.preventDefault();
    
    var that = this;
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/api/newPet',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data: {name: this.state.newPetName}
    })
    .success(function() {
      console.log('New pet created!');
      that.getCurrent();
    })
  }
  
  executeCommand(command){
    this.setStatus(command);
    this.getCurrent();
  }

  render() {
    return (
      <div className='app container'>
        <div className='row'>
          <NavigationBar />
        </div>
        <div className='row'>
          <div className='col-md-12 col-xs-12'>
            <h3>{this.state.name} is currently <span className='status'>{this.state.status}</span>!</h3>
            <div>
              <Petbox pet={this.state}/>
            </div>
            <div className='PetCommand'>{
              this.state.status !== 'dead' ? (<div>
                <PetCommand 
                  executeCommand={this.executeCommand.bind(this)}
                  displayLog={this.state.displayLog} showLog={this.showLog.bind(this)} 
                  status={this.state.status} disabled={this.state.disabled}/>
              </div>) : <Restart showNameInput={this.showNameInput.bind(this)} showNewName={this.state.showNewName} getInput={this.getInput.bind(this)} newPet={this.newPet.bind(this)}></Restart>
            }</div>
          </div>
          <div>{
            this.state.displayLog ?  <Logs logs={this.state.logs}/>: <div></div>
          }</div>
        </div>
      </div>
    )
  }
}

window.App = App;
ReactDOM.render(<App />, document.getElementById('app'));