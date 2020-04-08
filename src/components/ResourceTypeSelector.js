import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import AsylumConnectSelector from './AsylumConnectSelector';
import AsylumConnectCheckbox from './AsylumConnectCheckbox';
import ACBadge from './Badge';
import {breakpoints, searchInput, searchInputMobile} from '../theme';
import ResourceTypes from '../utils/resourceTypes';
import withWidth from './withWidth';

const styles = (theme) => ({
  searchInput: Object.assign(searchInput(theme), {
    borderLeft: '2px solid ' + theme.palette.common.lightGrey,
    cursor: 'pointer',
    position: 'relative',
    boxShadow:
      '-10px 0px 0px 0px rgba(255,255,255,1), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
    [theme.breakpoints.down('md')]: {
      boxShadow: '0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
      borderLeft: 'none',
    },
    [theme.breakpoints.down('xs')]: searchInputMobile(theme),
  }),
  uncheckLink: {
    fontFamily: theme.typography.body2.fontFamily,
    fontSize: theme.typography.body2.fontSize,
    fontWeight: theme.typography.body2.fontWeight,
    position: 'absolute',
    right: theme.spacing(2),
    top: theme.spacing(2),
    textDecoration: 'none',
  },
  sectionHeader: {
    color: theme.palette.common.darkBlack,
  },
  sectionTitle: {
    fontWeight: '600',
    display: 'inline-block',
    verticalAlign: 'middle',
  },
  dividerSpacing: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  subfilterSpacing: {
    marginTop: theme.spacing(2),
  },
  resourceList: {
    padding: theme.spacing(4),
    right: '0',
    maxHeight: '420px',
    [theme.breakpoints.down('xs')]: {
      maxHeight: '50vh',
    },
  },
});

const FilterCollection = (props) => (
  <div>
    <Typography variant="body2" className={props.classes.sectionHeader}>
      <ACBadge type={props.type} width="45px" height="45px" useIcon={true} />
      <span className={props.classes.sectionTitle}>
        {props.t(props.category)}
      </span>
      {typeof props.value !== 'undefined' ? (
        <span className={props.classes.sectionTitle}>
          <AsylumConnectCheckbox
            label=""
            value={props.category}
            onChange={props.onChange}
            checked={props.selectedResourceTypes.indexOf(props.category) >= 0}
          />
        </span>
      ) : null}
    </Typography>
    {typeof props.children !== 'undefined' && props.children.length ? (
      <Grid container spacing={0} className={props.classes.subfilterSpacing}>
        {props.children.map((filter, i) => (
          <Grid item key={i} xs={12} sm={6} md={4}>
            <AsylumConnectCheckbox
              label={props.t(filter.title)}
              value={filter.title}
              onChange={props.onChange}
              disabled={
                props.selectedResourceTypes.indexOf(props.category) >= 0
              }
              checked={
                props.selectedResourceTypes.indexOf(filter.title) >= 0 ||
                props.selectedResourceTypes.indexOf(props.category) >= 0
              }
            />
          </Grid>
        ))}
      </Grid>
    ) : null}
    {props.index + 1 !== props.resourceTypes.length ? (
      <Divider className={props.classes.dividerSpacing} />
    ) : null}
  </div>
);

class ResourceTypeSelector extends React.Component {
  render() {
    const {
      searchInput,
      sectionHeader,
      sectionTitle,
      subfilterSpacing,
      dividerSpacing,
      resourceList,
      uncheckLink,
    } = this.props.classes;
    const {
      onChange,
      selectedResourceTypes,
      clearResourceTypes,
      moveSearchButton,
    } = this.props;
    const isMobile = this.props.width < breakpoints['sm'];
    const containerWidth = isMobile ? '100%' : this.props.containerWidth + 'px';
    const resourceTypes = ResourceTypes.getResourceTypesByGroup(
      this.props.locale
    );

    return (
      <AsylumConnectSelector
        label="Service Type"
        selected={selectedResourceTypes}
        containerWidth={containerWidth}
        containerClass={searchInput}
        listContainerClass={resourceList}
        moveSearchButton={moveSearchButton}
      >
        <a href="#" onClick={clearResourceTypes} className={uncheckLink}>
          Uncheck All
        </a>
        {resourceTypes.map((filter, i) => (
          <FilterCollection
            key={i}
            index={i}
            classes={{
              sectionHeader,
              sectionTitle,
              subfilterSpacing,
              dividerSpacing,
            }}
            onChange={onChange}
            selectedResourceTypes={selectedResourceTypes}
            resourceTypes={resourceTypes}
            t={this.props.t}
            {...filter}
          />
        ))}
      </AsylumConnectSelector>
    );
  }
}

ResourceTypeSelector.propTypes = {
  clearResourceTypes: PropTypes.func.isRequired,
};

export default withStyles(styles)(withWidth(ResourceTypeSelector));