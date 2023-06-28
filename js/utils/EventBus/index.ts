import { Event } from "@/js/utils/EventBus/Event";

export enum Events {
    // Define event names here
    OnAction = "OnAction",
    ChecklistIframeHeight = "checklistsIframeHeight",
    ChecklistChanged = "checklistChanged",
    ArmyCandidateCreated = "armyCandidateCreated",
}

export const EventBus = {
    // Register events here
    [Events.OnAction]: new Event<{
        props: Record<string, any>;
        data: {
            action: string;
            [key: string]: any;
        };
    }>(),
    [Events.ChecklistIframeHeight]: new Event<{
        height: number;
    }>(),
    [Events.ChecklistChanged]: new Event<{
        checklistId: number;
    }>(),
    [Events.ArmyCandidateCreated]: new Event<{
        status: string;
        message: string;
    }>(),
};
