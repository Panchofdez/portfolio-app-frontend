import React,{useEffect} from 'react';
import {useRouteMatch, Route, Switch} from 'react-router-dom';
import AboutForm from '../containers/AboutForm';
import TimelineForm from '../containers/TimelineForm';
import ProfileForm from '../containers/ProfileForm';
import WorkForm from './WorkForm';
import withPortfolioCheck from '../hocs/withPortfolioCheck';



const PortfolioForm =(props)=>{
	let {path} = useRouteMatch();
	
	return(
		<div className='container'>
			<Switch>				
				<Route exact path={`${path}/about`}>
					<AboutForm {...props}/>
				</Route>
				<Route exact path={`${path}/profile`} component={withPortfolioCheck(ProfileForm)}/>
				<Route exact path={`${path}/timeline`}>
					<TimelineForm {...props}/>
				</Route>
				<Route exact path={`${path}/work`}>
					<WorkForm {...props}/>
				</Route>
				<Route path={path} component={withPortfolioCheck(ProfileForm)}/>
				

			</Switch>	
			 
		</div>
	)
	
};

function mapStateToProps(state){
	return {
		portfolio:state.showPortfolio.portfolio
	}
}

export default PortfolioForm;