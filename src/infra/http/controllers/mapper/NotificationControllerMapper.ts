import { Notification } from "@application/entities/Notification";


export default class NotificationsControllerMapper {
  static toHttp(notification: Notification){

    return {
      id: notification.id,
        recipientId: notification.recipientId,
        content: notification.content.value,
        category: notification.category,
    }
  }
}