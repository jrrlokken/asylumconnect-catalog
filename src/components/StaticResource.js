import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import ContentMarkdown from './ContentMarkdown';

require('./StaticResource.styles.scss');

const styles = (theme) => ({
  resourceMargin: {
    marginTop: theme.spacing(4),
  },
  marginBottom: {
    marginBottom: theme.spacing(1),
  },
  marginTop: {
    marginTop: theme.spacing(2),
  },
  infoItem: {
    fontWeight: theme.typography.fontWeightMedium,
    marginTop: theme.spacing(2),
  },
  applyColor: (props) => ({
    color: props?.color,
  }),
  linkColor: {
    color: theme.palette.secondary[500],
    '&:hover': {
      color: theme.palette.secondary[900],
    },
  },
});

const Resource = ({
  classes,
  color,
  name,
  link,
  description,
  who,
  how,
  visit,
  email,
}) => (
  <div className={'resource--with-markdown ' + classes.resourceMargin}>
    {name && (
      <Typography variant="subtitle2" className={classes.marginBottom}>
        {name}
      </Typography>
    )}
    {link && (
      <a href={`${link}`} target="_blank" rel="noopener noreferrer">
        <Typography
          variant="body2"
          className={classes.linkColor + ' ' + classes.marginBottom}
        >
          {link}
        </Typography>
      </a>
    )}
    {description && (
      <Typography variant="body2" className={classes.marginTop}>
        <ContentMarkdown
          renderers={{
            link: (props) => (
              <a href={props.href} target={props.target}>
                {props.children}
              </a>
            ),
          }}
          source={description}
        />
      </Typography>
    )}
    {who && (
      <Typography variant="body2" className={classes.infoItem}>
        Who this resource serves:
      </Typography>
    )}
    {who && (
      <Typography variant="body2">
        <ContentMarkdown
          renderers={{
            link: (props) => (
              <a href={props.href} target={props.target}>
                {props.children}
              </a>
            ),
          }}
          source={who}
        />
      </Typography>
    )}
    {how && (
      <Typography variant="body2" className={classes.infoItem}>
        How to use this resource:
      </Typography>
    )}
    {how && (
      <Typography variant="body2">
        <ContentMarkdown
          renderers={{
            link: (props) => (
              <a href={props.href} target={props.target}>
                {props.children}
              </a>
            ),
          }}
          source={how}
        />
      </Typography>
    )}
    {visit && (
      <Typography variant="body2" className={classes.infoItem}>
        How to visit this resource:
      </Typography>
    )}
    {visit && (
      <Typography variant="body2">
        <ContentMarkdown
          renderers={{
            link: (props) => (
              <a href={props.href} target={props.target}>
                {props.children}
              </a>
            ),
          }}
          source={visit}
        />
      </Typography>
    )}
  </div>
);

Resource.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  link: PropTypes.string,
  description: PropTypes.string,
  who: PropTypes.string,
  how: PropTypes.string,
  visit: PropTypes.string,
  email: PropTypes.string,
};

export default withStyles(styles)(Resource);
