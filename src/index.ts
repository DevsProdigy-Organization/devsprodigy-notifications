import "./style.css";
import { Notification, NotificationOptions } from "./Notification";

export const notification = (options: NotificationOptions) => {
  new Notification(options);
};
