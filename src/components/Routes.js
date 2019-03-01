import React from 'react'
import {Switch, Route,Link} from 'react-router-dom'
import Container from '../containers/Container'

const Routes = () =>{
     return (
    <main>
     <Switch>
        
       <Route exact path='/kvr' render={(routeProps) => (
                <Container {...routeProps} noForm={true} />)}>    
        </Route>  
        
        <Route exact path='/kvr/admin' component={Container}>    
        </Route> 
        
          
        
     </Switch>
    </main>
  );
}
export default Routes;
// <Route exact path='*'render={(routeProps) => (
//                <Container {...routeProps} noForm={true} />)}>     
        //</Route> 