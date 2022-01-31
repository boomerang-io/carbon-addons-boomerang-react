import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { settings } from 'carbon-components';
import { Button } from 'carbon-components-react';
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'carbon-components-react/lib/components/ComposedModal';

import HeaderMenuItem from '../HeaderMenuItem';

const { prefix } = settings;

class Feedback extends Component {
  render() {
    return (
      <HeaderMenuItem
        preventCloseOnClickOutside
        text="Submit an Idea"
        iconName="idea"
        className={`${prefix}--bmrg-feedback-container`}
      >
        {({ closeModal }) => {
          return (
            <>
              <ModalHeader title="Submit an Idea" closeModal={closeModal} />
              <ModalBody>
                <div className={`${prefix}--bmrg-feedback`}>
                  <p>
                    Share your thoughts and ideas on what we can do to improve the{' '}
                    {this.props.platformName} platform and our onboarding process.
                  </p>
                  <p>
                    To submit your idea, visit our portal at
                    {' ' /* We need to force a space before the link tag */}
                    <a
                      href={this.props.sendIdeasUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-describedby="new-window-aria-desc-0"
                    >
                      {this.props.sendIdeasUrl}
                    </a>
                  </p>
                  <p>
                    For now, you must have an IBM email address and you will need to register with a
                    password during your first visit.
                  </p>
                  <p>
                    You will have the opportunity to see other public ideas, vote on them and track
                    the status of your idea.
                  </p>
                  <p>We look forward to your feedback!</p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button kind="primary" onClick={closeModal}>
                  OK
                </Button>
              </ModalFooter>
            </>
          );
        }}
      </HeaderMenuItem>
    );
  }
}

Feedback.propTypes = {
  sendIdeasUrl: PropTypes.string,
};

export default Feedback;
