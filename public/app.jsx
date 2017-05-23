var Modal = window.ReactModal

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
      displayStatusMessage: true,
      displayLog: false,
      displayInfo: false,
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
    Modal.setAppElement('body');
    this.getCurrent();
    this.getLog();
  }

  switch(state){
    var newState = {}
    newState[state] = !this.state[state]
    this.setState(newState);
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


  newPet(e) {
    console.log('new Pet Name', this.state.newPetName)
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
            <h3 className='status'>{this.state.name} is currently  
              <span className='status status-accent'> {this.state.status}</span>!</h3>
            <div>
              <Petbox pet={this.state} switch={this.switch.bind(this)}/>
            </div>
            <div className='PetCommand'>{
              this.state.status !== 'dead' ? (<div>
                <PetCommand 
                  executeCommand={this.executeCommand.bind(this)}
                  displayLog={this.state.displayLog}
                  displayInfo={this.state.displayInfo}
                  switch={this.switch.bind(this)} 
                  status={this.state.status} disabled={this.state.disabled}/>
              </div>) : <Restart switch={this.switch.bind(this)} showNewName={this.state.showNewName} getInput={this.getInput.bind(this)} newPet={this.newPet.bind(this)}></Restart>
            }</div>
          </div>
          <div>{
            this.state.displayLog ?  
              <Logs logs={this.state.logs} switch={this.switch.bind(this)}/>: <div></div>
          }</div>
        </div>
         <Modal
          className='modal-info'
          isOpen={this.state.displayInfo}
          onAfterOpen={() => {}}
          onRequestClose={()=> {this.switch('displayInfo')}}
          closeTimeoutMS={1}
          contentLabel="Modal">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" className="close modal-close pull-right" data-dismiss="modal" 
              onClick={()=> {this.switch('displayInfo')}}>&times;</button>
              <h3 class="modal-title">Welcome to HRGotchi</h3>
            </div>
            <div class="modal-body">
              <p>HRGotchi is able to eat, sleep, play and code. 
              Please check every 3 minute or else HRGotchi will get lonely.
              If you fail to properly meet HRGotchi’s needs, 
              HRGotchi will run away, get spoiled, or die
              HRGotchi also can gain experience and level up by coding. 
              Find out what HRGotchi can become!</p>
            </div>
            <div class="modal-footer">
              <button type="button" className="btn btn-default pull-right" data-dismiss="modal"
              onClick={()=> {this.switch('displayInfo')}}>Close</button>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

window.App = App;
ReactDOM.render(<App />, document.getElementById('app'));