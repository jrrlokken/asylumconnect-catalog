import React from 'react';
import PropTypes from 'prop-types';

import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RadioUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

const relativeSize = 1;

const defaultIconSize = {
  height: relativeSize + 'rem',
  width: relativeSize + 'rem',
};

const styles = (theme) => ({
  root: {
    marginLeft: '0',
    color: theme.palette.common.lightBlack, //fix this for non-resource-type checkboxes
    '&:hover': {
      color: theme.palette.secondary[500],
    },
  },
  checkboxDefault: {
    color: 'inherit',
    width: relativeSize * 2 + 'rem',
    height: relativeSize * 2 + 'rem',
  },
  checkboxChecked: {
    color: theme.palette.secondary[500],
    width: relativeSize * 2 + 'rem',
    height: relativeSize * 2 + 'rem',
  },
  label: {},
});

const AsylumConnectRadio = (props) => {
  const classes = Object.assign(props.classes, props.overrideClasses);

  const rootClass = classNames(
    classes.root,
    props.additionalClasses ? props.additionalClasses.root : null
  );
  const checkboxDefault = classNames(
    classes.checkboxDefault,
    props.additionalClasses ? props.additionalClasses.checkboxDefault : null
  );
  const checkboxChecked = classNames(
    classes.checkboxChecked,
    props.additionalClasses ? props.additionalClasses.checkboxChecked : null
  );
  const labelClass = classNames(
    classes.label,
    props.additionalClasses ? props.additionalClasses.label : null
  );

  const iconSize = Object.assign(defaultIconSize, props.iconSize);

  return (
    <FormControlLabel
      control={
        <Radio
          value={props.value}
          icon={<RadioUncheckedIcon style={iconSize} />}
          checkedIcon={<CheckCircleIcon style={iconSize} />}
          name={props.name}
          checked={props.checked}
          classes={{
            default: checkboxDefault,
            checked: checkboxChecked,
          }}
          onChange={props.onChange}
        />
      }
      label={props.label}
      classes={{
        root: rootClass,
        label: labelClass,
      }}
    />
  );
};

AsylumConnectRadio.propTypes = {
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default withStyles(styles)(AsylumConnectRadio);
