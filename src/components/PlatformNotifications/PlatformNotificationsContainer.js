import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import sock from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { settings } from 'carbon-components';
import Notification from './PlatformNotifications';

const { prefix } = settings;

export default class PlatformNotificationsContainer extends React.Component {
  static propTypes = {
    /**
     * Pass in config for making WS and HTTP requests for Notifications
     * @property {String} wsUrl - full URL to websocket endpoint for receiving new notifications
     */
    config: PropTypes.shape({
      wsUrl: PropTypes.string.isRequired,
    }),

    /**
     * set the initial notifications on mount
     */
    initialNotifications: PropTypes.array,

    /**
     * boolean from the consumer that sends a signal to display/hide the component from view
     */
    isNotificationActive: PropTypes.bool.isRequired,

    /** function that is intended for the consumer to recieve a boolean
     * value indicating whether there are currently any new notifications
     * In the Header component, this information is used to determine whether
     * to display a "new notification" symbol
     */
    setHasNewNotifications: PropTypes.func.isRequired,

    /**
     * base launch url, used to redirect to Launchpad
     */
    baseLaunchEnvUrl: PropTypes.string,
  };

  static defaultProps = {
    initialNotifications: [],
  };

  state = {
    currentNotifications: this.props.initialNotifications,
    numNotifications: this.props.initialNotifications.length,
  };

  componentDidMount() {
    this.ws = new Client({});
    this.ws.webSocketFactory = () => {
      return new sock(this.props.config.wsUrl);
    };
    this.ws.activate();
    this.ws.onConnect = this.connect;
  }

  connect = () => {
    this.ws.subscribe('/user/queue/notifications', this.receiveNewNotifications);
    this.ws.subscribe('/user/queue/reply', this.replyRead);
    this.ws.subscribe('/user/queue/all', this.recieveAllUnreadNotifications);
    this.ws.publish({ destination: '/app/all', body: {} });
  };

  componentWillUnmount() {
    this.ws.deactivate();
  }

  /**
   * recieve x amount of new notifications and pass them into state of current notifications
   *
   */
  receiveNewNotifications = (incomingNotifications) => {
    if (incomingNotifications.body) {
      const data = [JSON.parse(incomingNotifications.body)];
      if (data.length > 0) {
        this.props.setHasNewNotifications(true);
      }
      this.setState((prevState) => ({
        currentNotifications: [...data, ...prevState.currentNotifications],
        numNotifications: prevState.numNotifications + data.length,
      }));
    } else {
      this.setState({
        error: true, // TOOD something here related to the error
      });
    }
  };

  /**
   * overwrite current notifications, the param represents all unread notifications
   */
  recieveAllUnreadNotifications = (incomingNotifications) => {
    if (incomingNotifications.body) {
      const jsonData = JSON.parse(incomingNotifications.body);
      const data = jsonData.records;
      if (data.length > 0) {
        this.props.setHasNewNotifications(true);
      } else {
        // This has to be decalred because this function can be triggered from the notification page in Launchpad
        this.props.setHasNewNotifications(false);
      }
      this.setState({
        currentNotifications: data,
        numNotifications: data.length,
      });
    } else {
      this.setState({
        error: true, // TOOD something here related to the error
      });
    }
  };

  /**
   * @param {Object} readResponse - list of notificationIds that have been read
   * the function removes the notifications from current state that are returned as "read"
   */
  replyRead = (readResponse) => {
    const readIdList = JSON.parse(readResponse.body);
    this.setState(
      (prevState) => ({
        currentNotifications: prevState.currentNotifications.filter(
          (el) => readIdList.indexOf(el.id) === -1
        ),
        numNotifications: prevState.numNotifications - readIdList.length,
      }),
      () => {
        if (this.state.numNotifications === 0) {
          this.props.setHasNewNotifications(false);
          // when we clear out notifications, check to to see if there are new notifications available
          this.ws.publish({ destination: '/app/all', body: {} });
        }
      }
    );
  };

  /**
   * notificationId - a single notification that the user has marked as read
   * @returns {Function} - makes network request, then after waiting for it to return, setState is called to update currentNotifications and numNotifications
   */
  handleReadNotification(notificationId) {
    this.ws.publish({
      destination: '/app/read',
      body: JSON.stringify([notificationId]),
    });
  }

  /**
   * @returns {Function} - makes network request with all remaining notification IDs, then after waiting for it to return, setState is called to empty out currentNotifications and numNotifications
   */
  handleReadAllNotifications() {
    const idList = this.state.currentNotifications.map((notification) => notification.id);
    this.ws.publish({ destination: '/app/read', body: JSON.stringify(idList) });
  }

  renderNotifications() {
    return this.state.currentNotifications.slice(0, 5).map((notification) => (
      <li key={notification.id}>
        <Notification
          readNotification={this.handleReadNotification.bind(this)}
          notificationInfo={notification}
        />
      </li>
    ));
  }

  render() {
    const { numNotifications, currentNotifications } = this.state;
    const { baseLaunchEnvUrl } = this.props;

    // Added stop propagation so the event doesn't close the menu
    return (
      <div // eslint-disable-line jsx-a11y/no-noninteractive-element-interactions
        role="article"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        className={cx(`${prefix}--bmrg-notifications`, {
          '--is-active': this.props.isNotificationActive,
        })}
      >
        <div className={`${prefix}--bmrg-notifications-header`}>
          <h1 className="bx--bmrg-notifications-header__newNotificaitons">
            {`${numNotifications} new notification${numNotifications !== 1 ? 's' : ''}`}
          </h1>
          <button
            className={`${prefix}--bmrg-notifications-header__clear`}
            disabled={!currentNotifications.length}
            onClick={this.handleReadAllNotifications.bind(this)}
          >
            Mark All Read
          </button>
        </div>
        <ul className={`${prefix}--bmrg-notifications__collection`}>
          {currentNotifications.length ? (
            this.renderNotifications()
          ) : (
            <div className={`${prefix}--bmrg-notifications-empty`}>
              <h1 className={`${prefix}--bmrg-notifications-empty__no-news`}>
                No news is good news, right?
              </h1>
            </div>
          )}
        </ul>
        <div className={`${prefix}--bmrg-notifications__notifications-footer`}>
          <a
            href={`${baseLaunchEnvUrl}/launchpad/notifications`}
            className={`${prefix}--bmrg-notifications__notifications-redirect-link`}
          >
            Open Notification Center
          </a>
        </div>
      </div>
    );
  }
}
