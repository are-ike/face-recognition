import React, {Component} from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import './App.css';



const particleOptions = {
  particles: {
      number: {
        value: 100,
        density: {
          enable: true,
          value_area: 800
        }
      }
  }
};

const initialState =  {
  input : '',
  imageURL: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    username: '',
    email: '',
    entries: 0,
    joined: ''
  }
}
class App extends Component {
  constructor(){
    super();
    this.state= initialState;
  }
  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      username: data.username,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  } 

  onInputChange = (e) =>{
    this.setState({input: e.target.value});
  }
  onButtonSubmit = () => {
    this.setState({imageURL: this.state.input})
    fetch('http://localhost:3001/imageUrl', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify({
        input: this.state.input
    })})
    .then(response => response.json())
    .then((response)=> {
      if(response){
        fetch('http://localhost:3001/image', {
          method: 'PUT',
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({
          id: this.state.user.id
        })})
        .then(res => res.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}))  
        })
        .catch(err => console.log);
      }
      this.setBox(this.calculateFaceBoundary(response))
    })
      .catch((err)=> console.log(err)) 
      
  }
  calculateFaceBoundary = (data)=>{
    const face = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('image'),
          width = Number(image.width),
          height = Number(image.height);

    return{
      leftCol: face.left_col * width,
      topRow: face.top_row * height,
      rightCol: width - (face.right_col * width),
      bottomRow: height - (face.bottom_row * height)
    }
  }

  setBox = (box) => {
    this.setState({box: box})
  }

  changeRoute =(route)=>{
    if(route === 'home'){
      this.setState({isSignedIn: true});
    }
    else if(route === 'signin'){
      this.setState(initialState);
    }
    this.setState({route: route});
  }

  render(){
    return (
      <div className="App">
        <Particles params={particleOptions} className="position"/>
        <Navigation onRouteChange ={this.changeRoute} isSignedIn={this.state.isSignedIn}/>
        {this.state.route === 'home' 
        ? <div>
          <Logo/>
          <Rank name={this.state.user.username} entries={this.state.user.entries}/>
          <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
          <FaceRecognition imageURL={this.state.imageURL} box={this.state.box}/>
        </div>
        :(this.state.route === 'signin'
        ? <Signin loadUser= {this.loadUser} onRouteChange ={this.changeRoute}/>
        : <Register loadUser= {this.loadUser} onRouteChange ={this.changeRoute}/> )}
      </div>
    );
  }
  
}

export default App;
