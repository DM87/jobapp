var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var IndexRoute = ReactRouter.IndexRoute;
var browserHistory = ReactRouter.browserHistory;

var $ = require('jquery');


// The main application layout
// this.props.children will be set by React Router depending on the current route
var CallTest = React.createClass({
    componentDidMount: function() {
    this.serverRequest = $.get(this.props.source, function (result) {
    console.log(result)
    })
    },

  render: function() {
    return (
      <div>
        <h1>test</h1>
      </div>
    );
  }
});


var App = React.createClass({
  render: function() {
    return (
      <main>
        <CallTest source="https://crossorigin.me/https://api.instagram.com/v1/tags/animals/media/recent?client_id=7fc34b3e0a1b458e867548097d3c7d5a" />
      </main>
    );
  }
});




// not found "page"
var NotFound = React.createClass({
  render: function() {
    return (
      <div>Not Found!</div>
    );
  }
});




var routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={App}/> 
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
);

// If this line of code is not here, nothing gets displayed!
ReactDOM.render(routes, document.querySelector('#app'));
