import React from 'react';
import Classes from './App.module.css'
import './index.css'
import {Switch,Route} from 'react-router-dom';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Intro from './pages/Landing/Intro'
import Landing from './pages/Landing';
function App(){
  return (
    <div className={Classes.App}>
      <Navbar />
      <main className={Classes.main}> 
          <Switch>
              <Route path="/" exact>
                  <Landing />
              </Route>
              <Route path="/contact">
                <Intro/>
              </Route>
          </Switch>
      </main>
      
      <Footer/>
    </div> 
  );
}

export default App;
