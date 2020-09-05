import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import axios from 'axios';

const InvitesButton = ({ otherUsers, currentUser, trip }) => {
  const [inviteClicked, setInviteClicked] = useState(false);

  if (inviteClicked === true) {
    if (currentUser.googleId !== otherUsers.googleId) {
      axios
        .post('/inviteAllOtherUsers', {
          otherUsers,
          trip,
        })
        .then((response) => {
          console.info(response);
        })
        .catch((err) => console.warn(err));
    }
  }

  return (
    <div>
      <Button
        variant="contained"
        onClick={() => {
          setInviteClicked(!inviteClicked);
        }}
      >
        Invite Users
      </Button>
    </div>
  );
};

InvitesButton.propTypes = {
  trip: PropTypes.number.isRequired,
  otherUsers: PropTypes.arrayOf(
    PropTypes.shape({
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      email: PropTypes.string,
      profile_pic: PropTypes.string,
      host: PropTypes.bool,
      googleId: PropTypes.string,
    }),
  ).isRequired,
  currentUser: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    profile_pic: PropTypes.string,
    host: PropTypes.bool,
    googleId: PropTypes.string,
  }).isRequired,
};

export default InvitesButton;
