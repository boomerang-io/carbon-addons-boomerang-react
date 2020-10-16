import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { settings } from 'carbon-components';
import { Button, TextArea } from 'carbon-components-react';
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'carbon-components-react/lib/components/ComposedModal';

import notify from '../Notifications/notify';
import HeaderMenuItem from '../HeaderMenuItem';
import ToastNotification from '../Notifications/ToastNotification';

const { prefix } = settings;

const initialState = {
  description: '',
  error: false,
  hasSubmitted: false,
  isPosting: false,
};

class ContactUs extends Component {
  state = {
    ...initialState,
  };

  handleOnDescriptionChange = (event) => {
    const description = event.target.value;
    this.setState({
      description,
    });
  };

  handleCloseModal = (closeModal) => {
    this.setState({ ...initialState });
    closeModal();
  };

  handleSubmit = async (event, closeModal) => {
    event.preventDefault();

    const serviceUrl = `${this.props.baseServiceUrl}/support/contact`;
    const body = {
      message: this.state.description,
    };

    this.setState({
      isPosting: true,
    });

    try {
      await axios.post(serviceUrl, body);
      notify(
        <ToastNotification
          subtitle="Successfully sent message"
          title="Contact Us"
          kind="success"
        />,
        { containerId: `${prefix}--bmrg-header-notifications` }
      );
      this.handleCloseModal(closeModal);
    } catch (error) {
      this.setState({ error, isPosting: false });
    }
  };

  render() {
    return (
      <HeaderMenuItem
        text="Contact"
        iconName="chat"
        className={`${prefix}--bmrg-contact-us-container`}
      >
        {({ closeModal }) => {
          return (
            <form onSubmit={(event) => this.handleSubmit(event, closeModal)}>
              <ModalHeader
                title="Contact us"
                label="Don't be shy"
                closeModal={() => this.handleCloseModal(closeModal)}
              />
              <ModalBody>
                <div className={`${prefix}--bmrg-contact-us`}>
                  <TextArea
                    id="bmrg-contact-us-textarea"
                    className={`${prefix}--bmrg-contact-us__textarea`}
                    labelText="What's your comment or concern?"
                    placeholder="Your lovely message goes here"
                    maxLength="1000"
                    onChange={this.handleOnDescriptionChange}
                    value={this.state.description}
                  />
                  {this.state.error && (
                    <p className={`${prefix}--bmrg-contact-us__error`}>
                      Failed to send message. Please try again.
                    </p>
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button kind="secondary" onClick={() => this.handleCloseModal(closeModal)}>
                  Cancel
                </Button>
                <Button
                  kind="primary"
                  type="submit"
                  disabled={!this.state.description || this.state.isPosting}
                >
                  {this.state.isPosting ? 'Sending' : 'Send'}
                </Button>
              </ModalFooter>
            </form>
          );
        }}
      </HeaderMenuItem>
    );
  }
}

ContactUs.propTypes = { baseServiceUrl: PropTypes.string };

ContactUs.defaultProps = {};

export default ContactUs;
