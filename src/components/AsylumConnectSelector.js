import React from 'react';

import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import classNames from 'classnames';

import AsylumConnectIndicator from './AsylumConnectIndicator';
import withWidth from './withWidth';
import {dropShadow} from '../theme';

const styles = (theme) => ({
  toggledSelect: {
    backgroundColor: theme.palette.secondary[100] + ' !important',
  },
  selectList: Object.assign(dropShadow(theme), {
    width: '100%',
    top: '100%',
    position: 'absolute',
    zIndex: '50',
    overflowY: 'auto',
  }),
  arrow: {
    width: '20px',
    height: '20px',
    color: theme.palette.common.lightBlack,
    float: 'right',
  },
  relative: {
    position: 'relative',
  },
  selectContainer: {
    cursor: 'pointer',
  },
  selectedLabel: {
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: theme.typography.fontSize - 1,
    lineHeight: 1.25,
  },
  labelContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicator: {
    display: 'inline-block',
    verticalAlign: 'top',
    marginLeft: '0.2rem',
    marginRight: '0.2rem',
    [theme.breakpoints.down('xs')]: {
      position: 'absolute',
      right: '20px',
    },
  },
});

class AsylumConnectSelector extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
    };
    this.id = 'selector--' + Date.now().toString();

    this.handleToggleRequest = this.handleToggleRequest.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handlePaperClick = this.handlePaperClick.bind(this);
    this.handleOpenDrawer = this.handleOpenDrawer.bind(this);
  }

  handleOutsideClick(event) {
    var watch = document.querySelectorAll('#' + this.id);
    if (watch.length) {
      if (!watch[0].contains(event.target)) {
        this.handleToggleRequest();
        this.handleOpenDrawer(event);
      }
    }
  }

  handleToggleRequest() {
    if (!this.state.open) {
      document.addEventListener('click', this.handleOutsideClick);
    } else {
      document.removeEventListener('click', this.handleOutsideClick);
    }

    this.setState({
      open: !this.state.open,
    });
  }

  handlePaperClick() {
    if (this.props.closeOnClick === true) {
      this.handleToggleRequest();
    }
  }

  handleOpenDrawer(event) {
    if (event && this.props.moveSearchButton) {
      this.props.moveSearchButton(this.state.open);
    }
  }

  render() {
    const {
      arrow,
      toggledSelect,
      relative,
      selectList,
      selectedLabel,
      selectContainer,
      labelContainer,
      indicator,
    } = this.props.classes;
    const {selected, label, containerWidth, containerClass, listContainerClass, colorClass} = this.props;
    const containerClasses = classNames(containerClass, this.state.open ? toggledSelect : '', selectContainer)
    const listContainerClasses = listContainerClass ? classNames(listContainerClass, selectList) : selectList;
    const rootClass =
      (this.props.rootClass ? this.props.rootClass + ' ' : '') + relative;

    return (
      <div className={rootClass}>
        <div
          className={containerClasses}
          onClick={(event) => {
            this.handleToggleRequest();
            this.handleOpenDrawer(event);
          }}
        >
          <div className={labelContainer}>
            <span className={selectedLabel}>{label}</span>
            {selected && selected.length ? (
              <AsylumConnectIndicator className={indicator} color="secondary">
                {selected.length}
              </AsylumConnectIndicator>
            ) : null}
            {this.state.open ? (
              <KeyboardArrowUpIcon className={classNames(arrow, colorClass)} />
            ) : (
              <KeyboardArrowDownIcon className={classNames(arrow, colorClass)} />
            )}
          </div>
        </div>
        {this.state.open ? (
          <Paper
            id={this.id}
            className={listContainerClasses + ' selector--asylum-connect'}
            style={{width: containerWidth}}
            onClick={this.handlePaperClick}
          >
            {this.props.children}
          </Paper>
        ) : null}
      </div>
    );
  }
}

export default withStyles(styles)(withWidth(AsylumConnectSelector));
