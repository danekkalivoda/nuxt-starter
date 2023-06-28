import { Listener } from "@/js/utils/EventBus/ListenerType";

export interface EventInterface<T> {
    listeners: Listener<T>[];
    subscribe: (listener: Listener<T>) => () => void;
    dispatch: (data: T) => Promise<void>;
}
