import React from 'react'
import {Switch, Route,Link} from 'react-router-dom'
import Container from '../containers/Container'

const Routes = () =>{
     return (
    <main>
     <Switch>
        
       <Route exact path='/' render={(routeProps) => (
                <Container {...routeProps} noForm={true} />)}>    
        </Route>  
        
        <Route exact path='/admin' component={Container}>    
        </Route> 
        
          
         <Route exact path='*' render={(routeProps) => (
                <Container {...routeProps} noForm={true} />)}>    
        </Route>  
     </Switch>
    </main>
  );
}
export default Routes;