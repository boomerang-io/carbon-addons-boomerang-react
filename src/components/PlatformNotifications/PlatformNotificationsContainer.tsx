import React from "react";
import { Client } from "@stomp/stompjs";
import Notification from "./PlatformNotification";
import cx from "classnames";
import { prefix } from "../../internal/settings";
import type { PlatformNotification } from "../../types";

type Props = {
  ["aria-labelledby"]: string;
  baseEnvUrl?: string;
  baseServicesUrl?: string;
  id: string;
  initialNotifications?: PlatformNotification[];
  isOpen: boolean;
  setHasNewNotifications: (hasNewNotifications: boolean) => void;
};

type State = { currentNotifications: PlatformNotification[]; numNotifications: number; error: boolean };

export default class PlatformNotificationsContainer extends React.Component<Props, State> {
  ws: any;
  articleRef = React.createRef();

  state = {
    error: false,
    currentNotifications: this.props.initialNotifications ?? [],
    numNotifications: this.props.initialNotifications?.length ?? 0,
  };

  componentDidMount() {
    const brokerURL = `${this.props.baseServicesUrl}/notifications/ws`
      .replace("https://", "wss://")
      .replace("http://", "ws://");
    this.ws = new Client({
      brokerURL,
      reconnectDelay: 10000,
    });
    this.ws.onConnect = this.connect;
    this.ws.activate();
  }

  connect = () => {
    this.ws.subscribe("/user/queue/notifications", this.receiveNewNotifications);
    this.ws.subscribe("/user/queue/reply", this.replyRead);
    this.ws.subscribe("/user/queue/all", this.recieveAllUnreadNotifications);
    this.ws.publish({ destination: "/app/all", body: {} });
  };

  componentWillUnmount() {
    this.ws.deactivate();
  }

  /**
   * recieve x amount of new notifications and pass them into state of current notifications
   *
   */
  receiveNewNotifications = (incomingNotifications: { body: string }) => {
    if (incomingNotifications.body) {
      const data = [JSON.parse(incomingNotifications.body)] as PlatformNotification[];
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
  recieveAllUnreadNotifications = (incomingNotifications: any) => {
    if (incomingNotifications.body) {
      const jsonData = JSON.parse(incomingNotifications.body);
      const data = jsonData.records;
      if (data.length > 0) {
        this.props.setHasNewNotifications(true);
      } else {
        // This has to be declared because this function can be triggered from the notification page in Launchpad
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
  replyRead = (readResponse: any) => {
    const readIdList = JSON.parse(readResponse.body);
    this.setState(
      (prevState: any) => ({
        currentNotifications: prevState.currentNotifications.filter((el: any) => readIdList.indexOf(el.id) === -1),
        numNotifications: prevState.numNotifications - readIdList.length,
      }),
      () => {
        if (this.state.numNotifications === 0) {
          this.props.setHasNewNotifications(false);
          // when we clear out notifications, check to to see if there are new notifications available
          this.ws.publish({ destination: "/app/all", body: {} });
        }
      }
    );
  };

  /**
   * notificationId - a single notification that the user has marked as read
   * @returns {Function} - makes network request, then after waiting for it to return, setState is called to update currentNotifications and numNotifications
   */
  handleReadNotification(notificationId: string) {
    this.ws.publish({
      destination: "/app/read",
      body: JSON.stringify([notificationId]),
    });
  }

  /**
   * @returns {Function} - makes network request with all remaining notification IDs, then after waiting for it to return, setState is called to empty out currentNotifications and numNotifications
   */
  handleReadAllNotifications() {
    const idList = this.state.currentNotifications.map((notification: any) => notification.id);
    this.ws.publish({ destination: "/app/read", body: JSON.stringify(idList) });
  }

  renderNotifications() {
    return this.state.currentNotifications.slice(0, 5).map((notification) => (
      <li key={notification.id}>
        <Notification readNotification={this.handleReadNotification.bind(this)} data={notification} />
      </li>
    ));
  }

  render() {
    const { numNotifications, currentNotifications } = this.state;
    const { baseEnvUrl } = this.props;

    return (
      <div
        aria-labelledby={this.props["aria-labelledby"]}
        className={cx(`${prefix}--bmrg-notifications`, {
          "--is-active": this.props.isOpen,
        })}
        id={this.props.id}
        role="dialog"
      >
        <div className={`${prefix}--bmrg-notifications-header`}>
          <h1 className={`${prefix}--bmrg-notifications-header__newNotifications`}>
            {`${numNotifications} new notification${numNotifications !== 1 ? "s" : ""}`}
          </h1>
          <button
            className={`${prefix}--bmrg-notifications-header__clear`}
            disabled={!currentNotifications.length}
            onClick={this.handleReadAllNotifications.bind(this)}
            aria-label="Mark all read"
          >
            Mark All Read
          </button>
        </div>
        <ul className={`${prefix}--bmrg-notifications__collection`}>
          {currentNotifications.length ? (
            this.renderNotifications()
          ) : (
            <div className={`${prefix}--bmrg-notifications-empty`}>
              <h1 className={`${prefix}--bmrg-notifications-empty__no-news`}>No news is good news, right?</h1>
            </div>
          )}
        </ul>
        <div className={`${prefix}--bmrg-notifications__notifications-footer`}>
          <a
            aria-label="Link for notification center"
            href={`${baseEnvUrl}/launchpad/notifications`}
            className={`${prefix}--bmrg-notifications__notifications-redirect-link`}
          >
            Open Notification Center
          </a>
        </div>
      </div>
    );
  }
}
