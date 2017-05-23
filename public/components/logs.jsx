var Modal = window.ReactModal;
console.log(Modal)

var Logs = function(props) {
  return (
    <div className="log">
      <button type="button" className="close close-log pull-right"
        onClick={()=> {props.switch('displayLog')}}>&times;</button>
      <br></br>
      <div>
      {props.logs.map(function(log, index) { 
        return (
          <span key={index} class="underscore">
          { log.action === 'need love' ? 
              log.name + ' needed love ' + log.createdAt :
              log.name + ' was ' + log.action + ' ' + log.createdAt}
          <br></br>
          </span> 
          )
      })}
      </div>
    </div>
    )
};