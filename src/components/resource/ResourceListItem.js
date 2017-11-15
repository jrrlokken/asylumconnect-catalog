import React from 'react';
import PropTypes from 'prop-types';
import Truncate from 'react-truncate';

import {
  Link
} from 'react-router-dom';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';

import { withStyles } from 'material-ui/styles';
import withWidth from '../withWidth';
import breakpoints from '../../theme/breakpoints';
import SaveToFavoritesButton from '../SaveToFavoritesButton';
import FavoritesLink from '../FavoritesLink';
import RatingAndReviews from './RatingAndReviews';
import Badge from '../Badge';
import resourceTypes from '../../helpers/ResourceTypes';

let resourceIndex = resourceTypes.getTagIndex();

const styles = (theme) => ({
  contentSpacing: {
    margin: "1.5rem 0"
  },
  lineSpacing: {
    lineHeight: "1.4rem"
  },
  dividerSpacing: {
    marginBottom: "2rem"
  },
  orgName: {
    fontSize: "21px"
  },
  moreInfo: {
    fontWeight: "600",
    color: theme.palette.primary[500]
  },
  [theme.breakpoints.down('sm')]: {
    pullLeft: {
      textAlign: "left"
    },
    contentSpacing: {
      margin: "0.75rem 0"
    },
    badgeSpacing: {
      marginBottom: "0.75rem"
    }
  }
});

const resourceFieldsByFormat = {
  'search': [
    {fieldName: 'description', label: 'About'}
  ]
}

class ResourceListItem extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    const {
      format,
      resource,
      classes,
      handleListAddFavorite,
      handleListRemoveFavorite,
      handleListNew,
      lists,
      session,
      user
    } = this.props;
    const {
      rightSide,
      ratingSpacing,
      contentSpacing,
      lineSpacing,
      dividerSpacing,
      badgeSpacing,
      moreInfo,
      orgName,
      pullLeft
    } = classes;
    const isMobile = this.props.width < breakpoints['sm'];
    //this.props.fetchSearchResults();
    return (
      <div>
        <Divider className={dividerSpacing} />
        <Grid container spacing={0}>
          <Grid item xs={12} >
            <Grid container alignItems="center" justify="space-between" spacing={0}>
              <Grid item xs md lg xl >
                <Link to={'/resource/'+resource.slug}><Typography type="subheading" className={orgName}>{resource.name}</Typography></Link>
              </Grid>
              {format === 'search' ? 
              <Grid item xs={3} >
                {session && (
                  <SaveToFavoritesButton
                    handleListAddFavorite={handleListAddFavorite}
                    handleListRemoveFavorite={handleListRemoveFavorite}
                    handleListNew={handleListNew}
                    lists={lists}
                    resourceId={resource.id}
                    session={session}
                    user={user}
                  />
                )}
              </Grid> 
              : null }
            </Grid>
          </Grid>
          {format == 'search' ? 
          <Grid item xs={12} >
            <Link to={'/resource/'+resource.slug}>
              <Typography type="body1" className={moreInfo} >
                See more information
              </Typography>
            </Link> 
          </Grid>
          : null}
          <Grid item xs={12} className={contentSpacing}>
            <Grid container spacing={0}>
            {resourceFieldsByFormat[format].map((item, index) => {
              var Content;
              var text = (isMobile ? 
                <Truncate lines={3} ellipsis={<span>...<Link to={'/resource/'+resource.slug} className={moreInfo}>read more</Link></span>} >
                  {resource[item.fieldName]}
                </Truncate>
              : resource[item.fieldName] );
              switch(format) {
                case 'search':
                  Content = () => (<Typography type="body2" className={lineSpacing}>
                    {text}
                  </Typography>);
                break;
                default:
                  Content = () => (<Typography type="body2" className={lineSpacing}>
                    <strong>{item.label}:</strong> {text}
                  </Typography>);
                break;
              }
              return (
                <Grid item xs={12} key={index} >
                  <Content key={index} />
                </Grid>);
            })}
            </Grid>
          </Grid>
          <Grid item xs={12} >
            <Grid container alignItems="center" spacing={0} justify="space-between">
              <Grid item xs={12} md={6} className={badgeSpacing}>
                {resource.opportunity_tags && resource.opportunity_tags.length ?
                  (() => {
                    let badges = [];
                    return resource.opportunity_tags.map((tag) => {
                      if(typeof resourceIndex[tag] !== 'undefined' && badges.indexOf(resourceIndex[tag].type) === -1) {
                        badges.push(resourceIndex[tag].type);
                        return (
                          <Badge key={resourceIndex[tag].type} type={resourceIndex[tag].type} width='45px' height='45px' />
                        )
                      }
                    })
                  })()
                : null}
              </Grid>
              <Grid item xs={12} md={6} className={"pull-right "+pullLeft}>
                <RatingAndReviews rating={ resource.rating ? resource.rating : resource.opportunity_aggregate_ratings} total={resource.opportunity_comment_count} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
    
}

ResourceListItem.propTypes = {
  format: PropTypes.string,
  handleListAddFavorite: PropTypes.func.isRequired,
  handleListRemoveFavorite: PropTypes.func.isRequired,
  handleListNew: PropTypes.func.isRequired,
  resource: PropTypes.object.isRequired,
  lists: PropTypes.arrayOf(PropTypes.object).isRequired,
  session: PropTypes.string,
  user: PropTypes.number,
};

ResourceListItem.defaultProps = {
  format: 'search',
  session: null,
  user: null,
};


export default withWidth(withStyles(styles)(ResourceListItem));