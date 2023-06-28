# Recruitis EventBus
### Simple event bus made to share events between both Vue and non-Vue components.

## Quickstart
* Define event name in Events enum
  * File: `/src/assets/js/utils/EventBus/index.ts`
  * Example: `ExampleEventOne = 'ExampleEventOne',`
* Register event in EventBus
  * File: `/src/assets/js/utils/EventBus/index.ts`
  * Example: `[Events.ExampleEventOne]: new Event<{ message: string }>(Events.ExampleEvent),`
* Subscribe to event
  * Example: `EventBus[Events.ExampleEventOne].subscribe((data) => { console.log(data.message); });`
* Dispatch event
  * Example: `EventBus[Events.ExampleEventOne].dispatch({ message: 'Hello world!' });`

## Examples
### Defining events
This is just an example code. Always define events in `/src/assets/js/utils/EventBus/index.ts` file.

```typescript
import Event from '@/js/utils/EventBus/Event';
import { EventBus } from '@/js/utils/EventBus';

/** Commented example */
// create type of data object sent to event listeners
type callbackDataType = { message: string };
// create Event<T> using defined data type and name it
const event = new Event<callbackDataType>();
// register event to event bus
EventBus['exampleEventOne'] = event;

/** Inline example */
EventBus['exampleEventOne'] = new Event<{ old: number; new: number }>();
```

### Subscribing to events
```typescript
import { EventBus } from '@/js/utils/EventBus';

EventBus['exampleEventOne'].subscribe((data) => {
    console.log(data.message);
});

// Callbacks can be asynchronous
EventBus['exampleEventTwo'].subscribe(async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(`Value ${data.old} has been changed to ${data.new}`);
});
```
You can access EventBus even from window object.
```typescript
window.EventBus['exampleEventOne'].subscribe((data) => {
    console.log(data.message);
});
```

### Emitting events

```typescript
import { EventBus } from '@/js/utils/EventBus';

EventBus['exampleEventOne'].dispatch({ message: 'Hello world!' });

// EventBus.dispatch method is asynchronous and can be awaited
await EventBus['exampleEventTwo'].dispatch({ old: 1, new: 2 });
```

### Unsubscribing from events

```typescript
import { EventBus } from '@/js/utils/EventBus';

// Subscribe method returns a function that can be called to unsubscribe from event
const unsubscribe = EventBus['exampleEventOne'].subscribe((data) => {
    console.log(data.message);
});

// Unsubscribe from event
unsubscribe();
```
