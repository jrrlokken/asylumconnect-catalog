import React from 'react';
import PropTypes from 'prop-types';

import {DialogTitle} from '../dialog';
import ShareFormContainer from './ShareFormContainer';

const ShareDialog = ({
  handleMessageNew,
  handleRequestClose,
  listId,
  listTitle,
  session,
  shareType
}) => (
  <div>
    <DialogTitle>Share "{listTitle}"</DialogTitle>
    <ShareFormContainer
      handleMessageNew={handleMessageNew}
      handleRequestClose={handleRequestClose}
      session={session}
      listId={listId}
      shareType={shareType}
    />
  </div>
);

ShareDialog.propTypes = {
  handleMessageNew: PropTypes.func.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
  listId: PropTypes.number.isRequired,
  listTitle: PropTypes.string.isRequired,
  // session: PropTypes.string.isRequired,
};

export default ShareDialog;