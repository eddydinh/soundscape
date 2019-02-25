import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Container from '../containers/Container'

const Routes = () =>{
     return (
    <main>
     <Switch>
       <Route exact path='/' render={(routeProps) => (
                <Container {...routeProps} noForm={true} />)}>    
        </Route>  
        
        <Route path='/admin' component={Container}>    
        </Route> 
        
          
         <Route  path='*' render={(routeProps) => (
                <Container {...routeProps} noForm={true} />)}>    
        </Route>  
     </Switch>
    </main>
  );
}
export default Routes;