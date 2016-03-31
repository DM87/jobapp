var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var IndexRoute = ReactRouter.IndexRoute;
var browserHistory = ReactRouter.browserHistory;
var EventEmitter = require('events');
var hub = new EventEmitter()
var $ = require('jquery');


// The main application layout
// this.props.children will be set by React Router depending on the current route


var InstaBox = React.createClass({
  // getInitialState: function(){
  //   return ({
  //     tag: "animals"
  //     })
  // },
  // componentDidMount(){
  //   hub.addListener("tag-request", this.TEST);
  // },
  // componentWillUnmount(){
  //   hub.removeListener("tag-request");
  // },
  // TEST(x){
  //   this.setState({
  //     tag:x
  //   })
  // },
  render: function(){
    return (
      <div className="mainContent">
        <CallTest />
      </div>
      )
  }
  
  
})



var CallTest = React.createClass({
 getInitialState: function () {
        return {
          tag: "animals",
          files: [],
        };
    },
    componentDidMount: function() {
    this.LoadTags()
    hub.addListener("tag-request", this.ChangeTag);
    },
    
    componentWillUnmount(){
      hub.removeListener("tag-request",this.ChangeTag);
    },
    
    LoadTags(){
      var link = "https://crossorigin.me/https://api.instagram.com/v1/tags/"+ this.state.tag + "/media/recent?client_id=7fc34b3e0a1b458e867548097d3c7d5a"
      var that = this
      this.serverRequest = $.get(link, function (result) {
      console.log(result.data)
      that.setState({
       files: result.data
      })
      })
    },
    
    ChangeTag(x){
      console.log(x)
    this.setState({
      tag:x
    },function(){
      this.LoadTags()
    })
    },

  render: function() {
    return (
      <div className="instabox">
        {this.state.files.map((file,i) => (
          <div
          key={i}>
          <img src={file.images.thumbnail.url} onClick={this.FullSize}/>
          </div>
          ))
        }
      </div>
    );
  }
});

var Menu = React.createClass({
  ChangeTag: function(x,e){
    if (e === ".0.0.0"){
      hub.emit("tag-request", "animals")
    } else if (e === ".0.0.1"){
      hub.emit("tag-request", "flowers")
    } else if (e === ".0.0.2"){
      hub.emit("tag-request", "people")
    }
  },
  render: function(){
    return (
      <div className="menu">
        <div onClick={this.ChangeTag}>
          <h2>#ANIMALS</h2>
        </div>
        <div onClick={this.ChangeTag}>
          <h2>#FLOWERS</h2>
        </div>
        <div onClick={this.ChangeTag}>
          <h2>#PEOPLE</h2>
        </div>
      </div>
      )
  }
})

var Deco = React.createClass({
  render(){
    return(
      <div className="dangleDeco">
        <img src="../css/images/character_5.png"/>
      </div>)
  }
})

var LinkBar = React.createClass({
  render(){
    return (
      <div className="toolbarlinks">
        <a>HOME</a>
        <a>APP INFO</a>
        <a>PHOTOS</a>
        <a>MUSIC</a>
        <a href="http://www.itunes.com"><img src="../css/images/apple_store.png"/></a>
      </div>
      )
  }
})

var App = React.createClass({
  render: function() {
    return (
      <main>
        <Menu />
        <Deco />
        <InstaBox />
        <LinkBar />
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
