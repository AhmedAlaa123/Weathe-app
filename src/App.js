import React ,{Component} from 'react';
import './App.css';
import Form from './component/Form';
import Weather from './component/Weather';
import { API_KEY } from './utlities/Constants';
import { API_LINK } from './utlities/Constants';
class App extends Component {
 state={
   temprature:'',
   city:'',
   country:'',
   humidity:'',
   description:'',
   error:''
 }
 
  // async make http request work in background
  getWeather= async(event)=>{
    event.preventDefault();
    const city=event.target.elements.city.value;
    const country=event.target.elements.country.value;
    if((city===''||country===''))
    {
      this.setState({
        temprature:'',
        city:'',
        country:'',
        humidity:'',
        description:'',
        error:'Please Enter The Data'
      })
      return
    }
    
    const api=await fetch( `${API_LINK}weather?q=${city},${country}&appid=${API_KEY}`)// Making http Request
    const data=await api.json();
    if(api.status===404){
      this.setState({
        temprature:'',
        city:'',
        country:'',
        humidity:'',
        description:'',
        error:'Please Enter Valid Data'
      })
    }
    else {
      this.setState({
        temprature:data.main.temp,
        city:data.name,
        country:data.sys.country,
        humidity:data.main.humidity,
        description:data.weather[0].description,
        error:''
      })
    }
    console.log(this.state)


  }

  render ()
 {
  return (
    <div className="wraper">
      <div className="weather-container">
        <Form getWeather={this.getWeather} />
        <Weather data={this.state}/>
        <footer className='text-center'>
          Copyright &copy; 2021 | Ahmed Alaa
        </footer>
      </div>
    </div>
  );
 }
}

export default App;
