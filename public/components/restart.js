

var Restart = (props) => (
  <div className='row'>
    <button className='restart' onClick={props.showNameInput}>Restart</button>
    <div>{
      props.showNewName ? (
        <form>
          <input className='restart-petName' placeholder='Enter new pet name' onKeyUp={props.getInput}></input>
          <button className='btn btn-primary' onClick={props.newPet}>Submit</button>
        </form>) : null
    }</div>
  </div>
);