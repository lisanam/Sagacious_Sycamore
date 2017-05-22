var Modal = window.ReactModal;
console.log(Modal)

var Logs = function(props) {
  return (
    <div>
      <br></br>
      <div className="status-message">
      {props.logs.slice().map(function(log, index) { 
        return (
          <span key={index} class="underscore">
          { log.action === 'need love' ? 
              log.name + ' needed love ' + log.createdAt :
              log.name + ' was ' + log.action + ' ' + log.createdAt}
          <br></br>
          </span> 
          )
      }) }
      </div>
    </div>
    )
};