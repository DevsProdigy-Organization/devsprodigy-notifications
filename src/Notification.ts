export type NotificationType = "info" | "warning" | "error" | "success";

type NotificationPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "bottom-center";

export interface NotificationOptions {
  title?: string;
  message: string;
  type?: NotificationType;
  duration?: number;
  position: NotificationPosition;
}

export class Notification {
  private title?: string;
  private message: string;
  private type?: NotificationType;
  private duration?: number;
  private position: NotificationPosition;

  private static lastNotification: HTMLElement | null = null;

  constructor({
    title,
    message,
    type,
    duration = 3000,
    position,
  }: NotificationOptions) {
    this.title = title;
    this.message = message;
    this.type = type;
    this.duration = duration;
    this.position = position;
    this.showNotification();
  }

  private showNotification() {
    if (Notification.lastNotification) {
      Notification.lastNotification.remove();
    }

    console.log("Showing notification");

    alert("Showing notification");

    // Crear el contenedor de la notificación
    const notification = document.createElement("div");
    notification.className = `max-w-sm p-2 rounded-xl shadow-lg bg-white border border-zinc-200 border-b-zinc-300/80 flex items-start gap-4 
      fixed z-[999] transform transition-transform duration-500 ease-in-out ${this.getPositionClass(
        this.position
      )} slide-out
    `;

    const classHeader = this.title == "" ? "" : "flex-col";

    notification.innerHTML = `
      <div class="flex-1 py-1.5 pl-2.5 flex gap-2 ${classHeader} ">
        ${this.getTitleHTML()}
        ${this.getMessageHTML()}
      </div>
      <div class="flex items-center">
        <button type="button" class="inline-flex items-center font-medium justify-center gap-2 truncate disabled:opacity-50  disabled:cursor-default h-8 text-sm rounded-md w-8 bg-transparent hover:bg-zinc-800/5  text-zinc-400 hover:text-zinc-800 dark:text-zinc-400 ">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
            <path fill-rule="evenodd" d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    `;

    // Añadir el botón de cierre
    const closeButton = notification.querySelector("button");
    closeButton?.addEventListener("click", () => {
      notification.remove();
    });

    // Añadir la notificación al cuerpo del documento
    document.body.appendChild(notification);

    Notification.lastNotification = notification;

    if (this.duration === 0) return;

    setTimeout(() => {
      notification.remove();
      Notification.lastNotification = null;
    }, this.duration);
  }

  private getTitleHTML() {
    return this.title
      ? `
        <div class="flex items-center gap-2">
          ${this.getIcon(this.type)}
          <div id="header" class="font-semibold text-sm text-zinc-800">
            ${this.title}
          </div>
        </div>
        `
      : "";
  }

  private getMessageHTML() {
    return this.title
      ? `<div><div class="text-zinc-600 font-base text-sm">${this.message}</div></div>`
      : `<div class="flex items-center gap-2">
          <div class="flex">
            ${this.getIcon(this.type)}
          </div>
          <div class="text-zinc-800 font-medium text-sm">${this.message}</div>
        </div>`;
  }

  private getIcon(type?: NotificationType) {
    switch (type) {
      case "info":
        return this.getIconInfo();
      case "success":
        return this.getIconSuccess();
      case "error":
        return this.getIconError();
      case "warning":
        return this.getIconWarning();
      default:
        return "";
    }
  }

  private getPositionClass(position: NotificationPosition) {
    switch (position) {
      case "top-left":
        return "top-4 left-4";
      case "top-right":
        return "top-4 right-4";
      case "bottom-left":
        return "bottom-4 left-4";
      case "bottom-right":
        return "bottom-4 right-4";
      case "top-center":
        return "top-4 left-1/2 -translate-x-1/2";
      case "bottom-center":
        return "bottom-4 left-1/2 -translate-x-1/2";
      default:
        return "top-4 right-4";
    }
  }

  private getIconInfo() {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48"><circle cx="24" cy="24" r="21" fill="#2196F3"/><path fill="#fff" d="M22 22h4v11h-4z"/><circle cx="24" cy="16.5" r="2.5" fill="#fff"/></svg>
    `;
  }

  private getIconSuccess() {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48"><circle cx="24" cy="24" r="21" fill="#4CAF50"/><path fill="#CCFF90" d="M34.6 14.6L21 28.2l-5.6-5.6l-2.8 2.8l8.4 8.4l16.4-16.4z"/></svg>
    `;
  }

  private getIconError() {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#e11d48" fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12s4.477 10 10 10s10-4.477 10-10M12 6.25a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-1.5 0V7a.75.75 0 0 1 .75-.75M12 17a1 1 0 1 0 0-2a1 1 0 0 0 0 2" clip-rule="evenodd"/></svg>
    `;
  }

  private getIconWarning() {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#eab308" d="m21.171 15.398l-5.912-9.854C14.483 4.251 13.296 3.511 12 3.511s-2.483.74-3.259 2.031l-5.912 9.856c-.786 1.309-.872 2.705-.235 3.83C3.23 20.354 4.472 21 6 21h12c1.528 0 2.77-.646 3.406-1.771s.551-2.521-.235-3.831M12 17.549c-.854 0-1.55-.695-1.55-1.549c0-.855.695-1.551 1.55-1.551s1.55.696 1.55 1.551c0 .854-.696 1.549-1.55 1.549m1.633-7.424c-.011.031-1.401 3.468-1.401 3.468c-.038.094-.13.156-.231.156s-.193-.062-.231-.156l-1.391-3.438a1.8 1.8 0 0 1-.129-.655c0-.965.785-1.75 1.75-1.75a1.752 1.752 0 0 1 1.633 2.375"/></svg>
    `;
  }
}
