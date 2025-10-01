import { SystemEvent, type SystemEventPayloads, ChapterCreatedPayload } from '@/modules/shared/domain-types/events.domain-types';
/*  */

// Re-export for convenience
export { SystemEvent };
export type { SystemEventPayloads, ChapterCreatedPayload };

// Define a generic handler type for listeners. It now accepts the event name as the first argument.
export type EventHandler<T = any> = (event: SystemEvent, payload: T) => void | Promise<void>;

class EventBus {
  // The registry will map an event to an array of listener functions (handlers)
  private listeners = new Map<SystemEvent, EventHandler[]>();

  /**
   * Subscribes a listener function to a specific event.
   * @param event The SystemEvent to subscribe to.
   * @param handler The function to execute when the event is published.
   */
  public register(event: SystemEvent, handler: EventHandler): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(handler);
    console.log(`[EventBus] Registered listener for event: ${event}`);
  }

  /**
   * Publishes an event, notifying all subscribed listeners.
   * Listeners are executed asynchronously, but without guarantees on order of completion.
   * @param event The SystemEvent to publish.
   * @param payload The data associated with the event.
   */
  public publish<T extends SystemEvent>(event: T, payload: SystemEventPayloads[T]): void {
    const eventListeners = this.listeners.get(event);

    if (eventListeners && eventListeners.length > 0) {
      console.log(`[EventBus] Publishing event: ${event} to ${eventListeners.length} listener(s).`);
      eventListeners.forEach((handler) => {
        try {
          Promise.resolve(handler(event, payload)).catch(error => {
            console.error(`[EventBus] Error in listener for event ${event}:`, error);
          });
        } catch (error) {
          console.error(`[EventBus] Synchronous error in listener for event ${event}:`, error);
        }
      });
    } else {
      console.warn(`[EventBus] No listeners registered for event: ${event}`);
    }
  }
}

// Export a singleton instance
export const eventBus = new EventBus();
