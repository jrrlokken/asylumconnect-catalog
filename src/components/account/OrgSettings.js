import React from 'react';
import PropTypes from 'prop-types';
import update from 'react-addons-update';

import { withStyles } from 'material-ui/styles';
import breakpoints from '../../theme/breakpoints';
import Typography from 'material-ui/Typography';

import Loading from '../Loading'
import OrgSettingsInfo from './OrgSettingsInfo';
import OrgSettingsHour from './OrgSettingsHour';
import OrgSettingsAdditional from './OrgSettingsAdditional';

import AsylumConnectButton from '../AsylumConnectButton';

import fetch from 'node-fetch';
import config from '../../config/config.js';
import fetchJsonp from 'fetch-jsonp';

const styles = theme => ({
  root: {
    width: '43%',
    padding: '0 5% 0 5%'
  },
  formType: {
    marginTop: '10%'
  },
  [`@media (max-width: ${breakpoints['sm']}px)`]:{
    root: {
      width: 'auto',
      padding: '0'
    },
    formType: {
      margin: '2% 0 2% 0'
    }
  },
  extraMargin: {
    margin: '20px 0 20px 0'
  },
  settingsTypeFont: {
    marginRight: '20px',
    lineHeight: '1.6',
    fontSize: 13,
    fontWeight: 700,
    fontFamily: "\"Open Sans\", sans-serif",
    color: theme.palette.common.lightBlack,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    cursor: 'pointer'
  },
  note: {
    backgroundColor: '#fff3c6',
    padding: '10px',
    marginTop: '10px'
  }
});

const defaultSchedule = {
  monday_start: '', monday_end: '',
  tuesday_start: '', tuesday_end: '',
  wednesday_start: '', wednesday_end: '',
  thursday_start: '', thursday_end: '',
  friday_start: '', friday_end: '',
  saturday_start: '', saturday_end: '',
  sunday_start: '', sunday_end: '',
}

class OrgSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isSent: false,
      orgData: {},
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.submitOrgData = this.submitOrgData.bind(this)
  }

  componentDidMount(){
    var jwt = localStorage.getItem("jwt");
    const { user, handleMessageNew } = this.props;
    const apiDomain = config[process.env.OD_API_ENV].odrs;
    const url = `${apiDomain}organizations/${user.affiliation.fetchable_id}.jsonp?`;
    const apiKeyParam = `api_key=${config[process.env.OD_API_ENV].odApiKey}`;
    
    fetchJsonp(url + apiKeyParam)
    .then(response => {
      if (response.ok) {
        response.json()
        .then((orgData) => {
          orgData.properties = [
            {
                "name": "approval-asylumconnect",
                "value": "false"
            },
            {
                "name": "source-name",
                "value": "asylumconnect"
            },
            {
                "name": "community-asylum-seeker",
                "value": "true"
            },
            {
                "name": "community-lgbt",
                "value": "true"
            }
          ]
          this.setState({ orgData })
          this.setState({isLoading: false})
        })        
      } else {
        handleMessageNew('Sorry, please try logging in again');
      }
    })
    .catch(error => {
      handleMessageNew('Oops! Something went wrong. Error:' + error);
    })    
  }
  handleChange(parent, name, value){
    const { orgData } = this.state
    let updatedOrgData
    if (parent === 'schedule') {
      updatedOrgData = update(orgData, {locations: { 0: {schedule: {$merge:{[name]: value}} }}})
    } else if (parent === 'address') {
      updatedOrgData = update(orgData, {locations: { 0: {$merge:{[name]: value}} }})
    } else if (parent === 'phones'){
      updatedOrgData = update(orgData, {locations: { 0: {phones: { 0: {$merge:{[name]: value}} }}}})
    } else {
      updatedOrgData = update(orgData,{$merge:{[name]: value}})
    }
    console.log(updatedOrgData)
    this.setState({ orgData: updatedOrgData })
  }
  handleClick(){
    const {orgData} = this.state;
    const {user, handleMessageNew} = this.props;
    const payload = {
      "api_key": config[process.env.OD_API_ENV].odApiKey,
      "submission": {
        "resource_id": orgData.id,
        "resource_type": "Organization",
        "client_user_id": user.id,
        "content": JSON.stringify(orgData),
        "submitter_type": "PublicForm"
      }
    }
    fetch(window.location.origin+'/api/submissions', 
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(payload)
    })
    .then(response => {
      if (response.status === 200) {
        this.setState({isSent: true})
        handleMessageNew('Your information has been submitted for reviewing.');
      } else {
        handleMessageNew('Oops! Something went wrong.');
      }
    })
  }
  render() {
    const { classes } = this.props;
    const { orgData, isLoading, isSent } = this.state;
    let schedule = (orgData && orgData.locations && orgData.locations[0]) ? orgData.locations[0].schedule : {}
    let name = (orgData && orgData.name) ? orgData.name:''
    let website = (orgData && orgData.website) ? orgData.website:''
    let region = (orgData && orgData.region) ? orgData.region:''
    let description = (orgData && orgData.description) ? orgData.description:''
    let address = (orgData && orgData.locations && orgData.locations[0]) ? orgData.locations[0]: {}
    return (
      <div className={classes.root}>
        <Typography type="display3" className={classes.formType}>Your Organization</Typography>
        {isLoading? (<Loading />):(
          <div>
            {orgData.has_pending_submission? (
              <div className={classes.note}><Typography type='body1'>We are still reviewing your recent edits. Below reflects the current live data on the site, and once we confirm your requested changes, they will be live on the site in 1-3 days.</Typography></div>
            ):('')}

            <OrgSettingsInfo 
              name={name} 
              website={website}
              region={region}
              description={description}
              address={address}
              onChange={this.handleChange}/>

            <OrgSettingsHour 
              schedule={schedule} 
              onChange={this.handleChange}/>
            
            {!isSent? (
              <div>
                <AsylumConnectButton variant='primary' onClick={this.handleClick}>request change</AsylumConnectButton>
                <Typography type='body1' className={classes.extraMargin}>All organization changes are subject to review by AsylumConnect before publication</Typography>
              </div>
            ):(
              <div className={classes.settingsTypeFont}>
                <span>Thank you for your request! All changes will be review by the AsylumConnect team and verification permitting, published as soon as possible. Question? Please email <Typography type='body1'><strong>catalog@asylumconnect.org</strong></Typography>.</span>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}

OrgSettings.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OrgSettings);