import { type IButtonInterface } from '../Button.vue';

export interface IButtonsListButton extends IButtonInterface {
    id: number
    text: string
    action: string
}
export interface IButtonsList {
    buttons: IButtonsListButton[]
}
