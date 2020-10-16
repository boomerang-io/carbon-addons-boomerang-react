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
import window from 'window-or-global';
import TooltipHover from '../TooltipHover';
import HeaderMenuItem from '../HeaderMenuItem';
import notify from '../Notifications/notify';
import ToastNotification from '../Notifications/ToastNotification';

import FileUploader from './FileUploader';

const { prefix } = settings;

const REQUEST_URL = '/support/bugs';
const ATTACHMENT_URL = '/support/issues';

const initialState = {
  description: '',
  postError: false,
  inludeUserEnvData: false,
  isPosting: false,
  uploadedFiles: [],
  uploadError: false,
  isDragActive: false,
};

const userEnvironment = {
  location: window.location ? window.location.href : '',
  referer: window.document ? window.document.referrer : '',
  userAgent: window.navigator ? window.navigator.userAgent : '',
  screenResolution: window.screen ? `${window.screen.width} x ${window.screen.height}` : '',
};

class ReportBug extends Component {
  static propTypes = {
    baseServiceUrl: PropTypes.string.isRequired,
  };

  static defaultProps = {};

  state = { ...initialState };

  modalRef = React.createRef();

  componentDidMount() {
    this.modalRef.current.addEventListener('dragenter', this.onDrag);
    this.modalRef.current.addEventListener('drop', this.onDragEnd);
    // using mouse leave here instead of a drag event that wasn't working
    this.modalRef.current.addEventListener('mouseleave', this.onDragEnd);
  }

  componentWillUnmount() {
    this.modalRef.current.removeEventListener('dragenter', this.onDrag);
    this.modalRef.current.removeEventListener('drop', this.onDragEnd);
    // using mouse leave here instead of a drag event that wasn't working
    this.modalRef.current.removeEventListener('mouseleave', this.onDragEnd);
  }

  onDrag = () => {
    this.setState({ isDragActive: true });
  };

  onDragEnd = () => {
    this.setState({ isDragActive: false });
  };

  handleCloseModal = (closeModal) => {
    this.setState({ ...initialState });
    closeModal();
  };

  handleFileFailure = () => {
    this.setState({
      uploadError: true,
    });
  };

  handleOnIncludeEnvDataChange = () => {
    this.setState((prevState) => ({
      inludeUserEnvData: !prevState.inludeUserEnvData,
      postError: false,
    }));
  };

  handleOnDescriptionChange = (event) => {
    const description = event.target.value;
    this.setState({
      description,
      postError: false,
    });
  };

  handleOnFileUpload = (file) => {
    this.setState({
      uploadedFiles: [...this.state.uploadedFiles, file],
      uploadError: false,
      postError: false,
    });
  };

  handleOnRemoveFile = (file) => {
    const filteredArray = this.state.uploadedFiles.filter((item) => item.name !== file.name);
    this.setState({
      uploadedFiles: filteredArray,
      uploadError: false,
      postError: false,
    });
  };

  postReportBug = (body) => {
    return axios.post(`${this.props.baseServiceUrl}${REQUEST_URL}`, body);
  };

  postReportAttachment = (body, key) => {
    return axios.post(`${this.props.baseServiceUrl}${ATTACHMENT_URL}/${key}/attachments`, body);
  };

  handleSubmit = async (event, closeModal) => {
    event.preventDefault();
    if (this.state.description) {
      const bugData = {
        description: this.state.description,
      };

      const requestBody = this.state.inludeUserEnvData
        ? { ...bugData, ...userEnvironment }
        : bugData;

      try {
        this.setState({
          isPosting: true,
        });

        const reportRes = await this.postReportBug(requestBody);

        if (this.state.uploadedFiles) {
          /**
           * can't make an "await" call in a forEach. Need to loop through and send each file attachment individually
           */
          const arrayLength = this.state.uploadedFiles.length;
          for (let i = 0; i < arrayLength; i++) {
            const attachmentBody = new FormData();
            attachmentBody.append('file', this.state.uploadedFiles[i]);
            await this.postReportAttachment(attachmentBody, reportRes.data.key);
          }
          /* attachmentBody.append('file', this.state.uploadedFiles);
          await this.postReportAttachment(attachmentBody, reportRes.data.key); */
        }
        this.setState({ ...initialState });
        notify(
          <ToastNotification
            subtitle="Successfully reported issue"
            title="Report Issue"
            kind="success"
          />,
          { containerId: `${prefix}--bmrg-header-notifications` }
        );
        this.handleCloseModal(closeModal);
      } catch (err) {
        this.setState({ isPosting: false, postError: err });
      }
    }
  };

  render() {
    return (
      <HeaderMenuItem
        text="Report issue"
        iconName="debug"
        className={`${prefix}--bmrg-report-bug-container`}
        ref={this.modalRef}
      >
        {({ closeModal }) => {
          return (
            <>
              <ModalHeader
                closeModal={() => this.handleCloseModal(closeModal)}
                label="We are here to help"
                title="Issues?"
              />
              <form
                className={`${prefix}--bmrg-report-bug-form`}
                onSubmit={(event) => this.handleSubmit(event, closeModal)}
              >
                <ModalBody>
                  <div className={`${prefix}--bmrg-report-bug`}>
                    <TextArea
                      id="bmrg-report-bug-textarea"
                      labelText="Describe your experience"
                      placeholder="Every time I click on my profile picture I see a horde of wombats!"
                      maxLength="1000"
                      onChange={this.handleOnDescriptionChange}
                      value={this.state.description}
                    />
                    {this.state.postError && (
                      <p className={`${prefix}--bmrg-report-bug__post-error`}>
                        Failed to send message. Please try again.
                      </p>
                    )}
                    <h2 className={`${prefix}--bmrg-report-bug__label-attachment`}>
                      Add an attachment
                    </h2>
                    {this.state.uploadError && (
                      <p className={`${prefix}--bmrg-report-bug__upload-error`}>
                        Please upload a file under 50mb
                      </p>
                    )}
                    <p className={`${prefix}--bmrg-report-bug__attachment-desc`}>
                      A screenshot would be nice. A video would be even more helpful if you have
                      nothing better to do.
                    </p>
                    <FileUploader
                      onFileFailure={this.handleFileFailure}
                      onFileUpload={this.handleOnFileUpload}
                      removeFile={this.handleOnRemoveFile}
                      reportBugState={this.state}
                    />
                    <div className={`${prefix}--checkbox-wrapper`}>
                      <input
                        id="bmrg-report-bug-checkbox-env"
                        className={`${prefix}--checkbox`}
                        checked={this.state.inludeUserEnvData}
                        onChange={this.handleOnIncludeEnvDataChange}
                        type="checkbox"
                      />
                      <label
                        htmlFor="bmrg-report-bug-checkbox-env"
                        className={`${prefix}--checkbox-label`}
                      >
                        Include data about your current environment
                      </label>
                    </div>
                    <p className={`${prefix}--bmrg-report-bug__env-desc`}>
                      Like the browser page, URL, your children's names, and your social security
                      number
                    </p>

                    <TooltipHover
                      className={`${prefix}--bmrg-reportbug-env-tooltip-container`}
                      align="start"
                      direction="top"
                      tooltipContent={
                        <div className={`${prefix}--bmrg-reportbug-env-tooltip`}>
                          <ul className={`${prefix}--bmrg-report-bug-tooltip`}>
                            <li className={`${prefix}--bmrg-report-bug-tooltip__header`}>
                              Information collected about you
                            </li>
                            <li className={`${prefix}--bmrg-report-bug-tooltip__divider`} />
                            <li className={`${prefix}--bmrg-report-bug-tooltip__header`}>
                              Location
                            </li>
                            <li className={`${prefix}--bmrg-report-bug-tooltip__detail`}>
                              {userEnvironment.location}
                            </li>
                            <li className={`${prefix}--bmrg-report-bug-tooltip__divider`} />
                            <li className={`${prefix}--bmrg-report-bug-tooltip__header`}>
                              Referrer
                            </li>
                            <li className={`${prefix}--bmrg-report-bug-tooltip__detail`}>
                              {userEnvironment.referer}
                            </li>
                            <li className={`${prefix}--bmrg-report-bug-tooltip__divider`} />
                            <li className={`${prefix}--bmrg-report-bug-tooltip__header`}>
                              User-agent
                            </li>
                            <li className={`${prefix}--bmrg-report-bug-tooltip__detail`}>
                              {userEnvironment.userAgent}
                            </li>
                            <li className={`${prefix}--bmrg-report-bug-tooltip__divider`} />
                            <li className={`${prefix}--bmrg-report-bug-tooltip__header`}>
                              Screen resolution
                            </li>
                            <li className={`${prefix}--bmrg-report-bug-tooltip__detail`}>
                              {userEnvironment.screenResolution}
                            </li>
                          </ul>
                        </div>
                      }
                    >
                      <div className={`${prefix}--bmrg-reportbug-env-tooltip-trigger`}>
                        What are we really collecting?
                      </div>
                    </TooltipHover>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button kind="secondary" onClick={() => this.handleCloseModal(closeModal)}>
                    Cancel
                  </Button>
                  <Button
                    kind="primary"
                    type="submit"
                    disabled={
                      !this.state.description || this.state.isPosting || this.state.uploadError
                    }
                  >
                    {this.state.isPosting ? 'Sending' : 'Send'}
                  </Button>
                </ModalFooter>
              </form>
            </>
          );
        }}
      </HeaderMenuItem>
    );
  }
}

export default ReportBug;
