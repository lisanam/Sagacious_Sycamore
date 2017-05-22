// image generator with different icons based on pet mood
var Petbox = (props) => {
  // css styling for the progress bar'';;;
  var statusProps = {
    love: props.pet.love,
    status: props.pet.status,
    energy: props.pet.feed,
    health: props.pet.health,
    level: props.pet.level,
    experience: props.pet.experience,
    name: props.pet.name
  }
  var bars = {
    loveBar: { width: props.pet.love/8 * 100 + '%' },
    energyBar: { width: props.pet.feed/8 * 100 + '%' },
    healthBar: { width: props.pet.health/8 * 100 + '%' },
    levelBar:  { width: props.pet.level/3 * 100 + '%' },
    experienceBar: { width: props.pet.experience/5 * 100 + '%' }
  }

  return (
  <div className='petView container'>
    <div className='row'>
      <div className='pet-image-container col-md-6 col-xs-6'>
        <img className="pet-image" src={props.pet.img}></img>
        <div>
          <StatusMessage petState={statusProps} />
        </div>
      </div>
      <div className='stats col-md-6 col-xs-6'>
        <div className='stats container'>
            <div className='row'>
              <b>Health:</b> {props.pet.phys}
              <div className='progress'>
                  <div className="progress-bar progress-bar-danger progress-bar-striped active" role="progressbar" style={bars['healthBar']}>
                  </div>
              </div>
            </div>
            <div className='row'>
              <b>Mood:</b> {props.pet.mood}
              <div className='progress'>
                  <div className="progress-bar progress-bar-striped active" role="progressbar" style={bars['loveBar']}>
                  </div>
              </div>
            </div>
            <div className='row'>
              <b>Energy:</b>
              <div className='progress'>
                  <div className="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" style={bars['energyBar']}>
                  </div>
              </div>
            </div>
            <div className='row'>
              <b>Level:</b> {props.pet.level} / 3
              <div className='progress'>
                  <div className="progress-bar progress-bar-warning progress-bar-striped active" role="progressbar" style={bars['levelBar']}>
                  </div>
              </div>
            </div>
            <div className='row'>
              <b>Experience:</b>
              <div className='progress'>
                  <div className="progress-bar progress-bar-info progress-bar-striped active" role="progressbar" style={bars['experienceBar']}>
                  </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
  )
}

window.Petbox = Petbox;