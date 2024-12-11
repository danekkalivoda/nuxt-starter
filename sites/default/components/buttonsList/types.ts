import { type IButtonInterface } from '../Button.vue';

interface IButtonsListButton extends IButtonInterface {
    id: number
    text: string
    action: string
}
export interface IButtonsList {
    buttons: IButtonsListButton[]
}
