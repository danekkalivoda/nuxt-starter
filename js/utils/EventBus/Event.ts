import { Listener } from "@/js/utils/EventBus/ListenerType";
import { EventInterface } from "@/js/utils/EventBus/EventInterface";

export class Event<T> implements EventInterface<T> {
    private readonly _listeners: Listener<T>[] = [];

    get listeners(): Listener<T>[] {
        return this._listeners;
    }

    public subscribe(listener: Listener<T>): () => void {
        this._listeners.push(listener);
        // return a function to unsubscribe the listener
        return () => this._listeners.splice(this._listeners.indexOf(listener), 1);
    }

    async dispatch(data: T): Promise<void> {
        const promises = [];

        for (const listener in this._listeners) {
            const promise = this._listeners[listener](data);
            if (promise instanceof Promise) {
                promises.push(promise);
            }
        }

        await Promise.all(promises);
    }
}
