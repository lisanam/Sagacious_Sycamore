class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    // this.logoutHandler = this.logoutHandler.bind(this);
  }

  // logoutHandler() {
  //   var that = this;
  //   $.ajax({
  //     method: 'GET',
  //     url: 'http://localhost:3000/logout',
  //     headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  //   })
  //   .success(function() {
  //       browserHistory.currentUser = null;
  //       browserHistory.push({
  //         pathname: '/login'
  //       })
  //   })
  // }

  render() {
    return (
      <div>
        <nav className="navigation navbar navbar-dark bg-primary">
          <span className="navbar-brand">Welcome to HRGotchi, {'Lisa'}!</span>
        </nav>
      </div>
    )
  }
} 

window.NavigationBar = NavigationBar;