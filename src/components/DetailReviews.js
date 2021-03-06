import React from 'react';

import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {boldFont, dividerSpacing} from '../theme';
import Loading from './Loading';

const styles = (theme) => ({
  bottomSpacing: {
    marginBottom: '0.9rem',
  },
  boldFont: boldFont(theme),
  dividerSpacing: Object.assign(dividerSpacing(theme), {
    marginTop: dividerSpacing(theme).marginBottom,
  }),
  switchInputRoot: {
    flexDirection: 'row-reverse',
    width: '100%',
    maxWidth: '500px',
    marginRight: '0px',
  },
  switchRoot: {
    height: 'auto',
  },
  reviewBadge: {
    display: 'inline-block',
    fontSize: '0.6rem',
    borderRadius: '4px',
    padding: '0px 6px',
    width: '120px',
    textAlign: 'center',
    marginBottom: '0.3rem',
  },
  reviewOD: {
    backgroundColor: '#30BCD5',
    color: theme.palette.common.darkBlack,
  },
  reviewAC: {
    backgroundColor: theme.palette.secondary[500],
    color: theme.palette.common.white,
  },
});

const ReviewList = ({title, classes, list}) => (
  <div>
    {title ? (
      <Typography
        variant="subtitle2"
        className={classes.boldFont + ' ' + classes.bottomSpacing}
      >
        {title}
      </Typography>
    ) : null}
    {list.length ? (
      list.map((review) => (
        <Grid
          key={review.userId}
          container
          spacing={0}
          className={classes.bottomSpacing}
        >
          <Grid item xs={12}>
            <Typography variant="body2">"{review.comment}"</Typography>
          </Grid>
        </Grid>
      ))
    ) : (
      <Typography variant="body2" className={classes.boldFont}>
        No Reviews
      </Typography>
    )}
  </div>
);

const Reviews = ({classes, reviews}) => (
  <Grid container spacing={0}>
    <Grid item xs={12}>
      <Grid container spacing={0} justify="space-between">
        <Grid item xs={12} md={12}>
          {reviews === false ? (
            <Loading />
          ) : (
            <ReviewList title="User Reviews" list={reviews} classes={classes} />
          )}
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

export default withStyles(styles)(Reviews);
