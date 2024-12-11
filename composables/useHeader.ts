interface HeaderState {
    isSticky: boolean;
    yOffset: number;
    height: number;
    isMenuOpen: boolean;
}
const state = reactive<HeaderState>({
    isSticky: false,
    yOffset: 0,
    height: 0,
    isMenuOpen: false,
});

export const useHeader = () => {

    const setState = (newState: Partial<HeaderState>): void => {
        Object.assign(state, newState);
    };

    return {
        state: readonly(state),
        setState,
    };
};
