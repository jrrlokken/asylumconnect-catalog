import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import url from 'url';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import RatingAndReviews from './ResourceRatingAndReviews';
import Phone from './ResourcePhone';
import Disclaimer from './Disclaimer';

const DetailHeader = ({
  alertMessage,
  classes,
  name,
  website,
  rating,
  totalRatings,
  phones,
  isMobile,
  isService,
  orgName,
  orgLink,
}) => (
  <Fragment>
    <Grid container spacing={0} alignItems="center">
      {alertMessage && <Disclaimer text={alertMessage} />}
      <Grid item xs={12} className={classes.bottomSpacing}>
        <Grid
          container
          alignItems="flex-start"
          justify="space-between"
          spacing={0}
        >
          <Grid item xs md lg xl>
            <Typography
              variant="h2"
              className={classes.orgName + ' ' + classes.boldFont}
            >
              {name}
            </Typography>
          </Grid>
          {isService && isMobile ? (
            <Grid item xs={12} className={classes.serviceOrgContainer}>
              <Typography variant="h6" className={classes.serviceOrg}>
                Service from <Link to={orgLink}>{orgName}</Link>
              </Typography>
            </Grid>
          ) : null}
          {((totalRatings || rating) && isMobile) || !isMobile ? (
            <Grid
              item
              xs={12}
              md={5}
              className={isMobile ? classes.mobileRatingSummary : 'pull-right'}
            >
              {/* <RatingAndReviews total={totalRatings} rating={rating} /> */}
            </Grid>
          ) : null}
        </Grid>
      </Grid>
      {isMobile ? (
        website && (
          <Grid item xs={12}>
            <Typography
              variant="body1"
              className={classes.moreInfo + ' ' + classes.bottomSpacing}
            >
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className={classes.bodyLink}
              >
                {url.parse(website)?.hostname || website}
              </a>
            </Typography>
          </Grid>
        )
      ) : (
        <Grid item xs={12}>
          <Typography
            variant="body1"
            className={classes.moreInfo + ' ' + classes.bottomSpacing}
          >
            {website && (
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className={classes.bodyLink}
              >
                {url.parse(website)?.hostname || website}
              </a>
            )}{' '}
            {phones && phones.length ? '| ' : null}
            {phones && phones.length ? (
              <Phone phone={phones[0]} classes={classes} />
            ) : null}
          </Typography>
        </Grid>
      )}
      {isMobile && phones && phones.length ? (
        <Grid item xs={12}>
          <Typography
            variant="body1"
            className={classes.moreInfo + ' ' + classes.bottomSpacing}
          >
            <Phone phone={phones[0]} classes={classes} />
          </Typography>
        </Grid>
      ) : null}
    </Grid>
  </Fragment>
);

export default DetailHeader;
