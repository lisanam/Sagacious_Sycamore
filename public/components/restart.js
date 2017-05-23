

var Restart = (props) => (
  <div className='row'>
    <button className='restart btn btn-default' onClick={() => {props.switch('showNewName')}}>Restart</button>
    <div>{
      props.showNewName ? (
        <form>
          <input className='newPetName' placeholder='Enter new pet name' onKeyUp={props.getInput}></input>
          <button className='btn btn-primary' onClick={props.newPet}>Submit</button>
        </form>) : null
    }</div>
  </div>
);