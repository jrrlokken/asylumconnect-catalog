import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Fa from 'react-fontawesome';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import Menu, {MenuItem} from 'material-ui/Menu';
import Typography from 'material-ui/Typography';
import {withStyles} from 'material-ui/styles';

import AsylumConnectButton from '../AsylumConnectButton';
import ResourceListItem from '../resource/ResourceListItem';

const styles = theme => ({
  container: {
    maxWidth: '720px',
    margin: '3rem 0 5rem',
  },
  footer: {
    backgroundColor: theme.palette.common.blue,
    color: theme.palette.common.darkWhite,
    minHeight: '180px',
    padding: '3rem 0',

  },
  minHeight350: { minHeight: '350px' },
  marginBottom: {marginBottom: '2rem'},
  marginLeft: {marginLeft: '1rem'},
  marginRight: {marginRight: '1rem'},
  marginTop: {marginTop: '2rem'},
  mainRow: {
    borderBottom: `1px solid ${theme.palette.common.darkGrey}`,
    margin: '1rem -8px .5rem',
    paddingBottom: '1rem',
  },
  textWhite: {color: theme.palette.common.darkWhite},
});

const FavoritesList = ({
  anchorEl,
  classes,
  handleListNew,
  handleListSelect,
  handleMenuOpen,
  handleMenuClose,
  handleMessageNew,
  handleRemoveFavorite,
  handleRequestOpen,
  loadingResources,
  list,
  lists,
  match,
  open,
  publicList,
  resources,
  session,
  user,
}) => (
  <Grid
    container
    className={null}
    direction="column"
    alignItems="center"
    spacing={0}
    >
    <Typography className={classes.marginTop} type="display1">
      {publicList ? publicList : 'Favorites'}
    </Typography>
    {session
      ? (
        <Typography type="body1">
          {!publicList && 'Your favorites lists are only visible to you and anyone you choose to share your lists with.'}
        </Typography>
      ) : (
        <Typography className={classes.minHeight350} type="body1">
          You must be logged in to use favorites.
        </Typography>
      )
    }
    {session && (
      <Grid
        container
        className={classes.container}
        direction="row"
        justify="space-between"
        >
        {!publicList && (
          <Grid 
            container 
            className={classes.mainRow} 
            justify="space-between"
            >
            <Button
              aria-owns={open ? 'favorites-menu' : null}
              aria-haspopup="true"
              onClick={handleMenuOpen}>
              {list ? list.title : 'Select A List'}
              {` `}
              <Fa
                className={classes.marginLeft}
                name={open ? 'chevron-up' : 'chevron-down'}
              />
            </Button>
            <div>
              {list && (
                <AsylumConnectButton 
                  variant="secondary"
                  onClick={() => {window.print()}}
                >
                  Print
                </AsylumConnectButton>
              )}
              {list && (
                <AsylumConnectButton
                  className={classes.marginLeft}
                  onClick={() => (session 
                    ? handleRequestOpen('share/collection/'+list.id+'/'+list.title)
                    : handleMessageNew('You must be logged in to share resources'))}
                  variant="primary">
                  Share
                </AsylumConnectButton>
              )}
              <AsylumConnectButton
                className={classes.marginLeft}
                onClick={() => handleRequestOpen('listNew/favoritesList')}
                variant="primary">
                <Fa className={classes.marginRight} name="plus" /> Create New List
              </AsylumConnectButton>
            </div>
          </Grid>
        )}
        <Grid container justify="center">
          <div className={classes.minHeight350}>
            {loadingResources ? (
              <Fa className={classes.marginTop} name="spinner" spin />
            ) : (
              <div>
                {resources.map(resource =>
                  <ResourceListItem
                    isOnFavoritesList={true}
                    handleMessageNew={handleMessageNew}
                    handleListRemoveFavorite={handleRemoveFavorite}
                    key={resource.id}
                    resource={resource}
                    format='favorites'
                  />
                )}
              </div>
            )}
            {!loadingResources && list && resources.length === 0 && (
              <Typography className={classes.marginTop} type="body1">
                You haven't added any resources to this list yet.
              </Typography>
            )}
          </div>
        </Grid>
      </Grid>
    )}

    <Grid
      container
      className={classes.footer}
      direction="column"
      alignItems="center"
      spacing={0}
      >
      {list && (
        <div>
          <Typography
            className={classNames(classes.marginBottom, classes.textWhite)}
            type="display2">
            {`Share "${list.title}" Favorites List`}
          </Typography>
          <Grid container 
            justify="center"
            spacing={0}
            >
            <AsylumConnectButton
              className={classes.marginRight}
              onClick={() => {window.print()}}
              variant="primary"
            >
              Print
            </AsylumConnectButton>
            <AsylumConnectButton
              className={classes.marginLeft}
              onClick={() => handleRequestOpen('share/collection/'+list.id+'/'+list.title)}
              variant="primary">
              Share
            </AsylumConnectButton>
          </Grid>
        </div>
      )}
    </Grid>

    <Menu
      id="favorites-menu"
      anchorEl={anchorEl}
      anchorOrigin={{vertical: 'bottom'}}
      getContentAnchorEl={null}
      open={open}
      onRequestClose={handleMenuClose}
      PaperProps={{style: {maxHeight: '300px'}}}>
      {lists.map(listOption => (
        <MenuItem
          key={listOption.id}
          onClick={() => handleListSelect(listOption)}
          selected={list && listOption.id === list.id}
        >
          {listOption.title}
        </MenuItem>
      ))}
    </Menu>
  </Grid>
);

FavoritesList.defaultProps = {
  anchorEl: null,
  list: null,
  publicList: null,
  session: null,
  user: null,
};

FavoritesList.propTypes = {
  anchorEl: PropTypes.object,
  classes: PropTypes.object.isRequired,
  handleListNew: PropTypes.func.isRequired,
  handleListSelect: PropTypes.func.isRequired,
  handleMenuOpen: PropTypes.func.isRequired,
  handleMenuClose: PropTypes.func.isRequired,
  handleMessageNew: PropTypes.func.isRequired,
  handleRequestOpen: PropTypes.func.isRequired,
  handleRemoveFavorite: PropTypes.func.isRequired,
  loadingResources: PropTypes.bool.isRequired,
  list: PropTypes.object,
  lists: PropTypes.arrayOf(PropTypes.object).isRequired,
  open: PropTypes.bool.isRequired,
  publicList: PropTypes.string,
  resources: PropTypes.arrayOf(PropTypes.object).isRequired,
  session: PropTypes.string,
  user: PropTypes.number,
};

export default withStyles(styles)(FavoritesList);
