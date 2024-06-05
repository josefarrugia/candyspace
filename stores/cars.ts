export const useCarStore = defineStore('carStore', {
    state: () => ({
        cars: [],
    }),
    getters: {
        getCars(state) {
            return state.cars;
        }
    },
    actions: {
        updateCars(payload: Array<Object>) {
            this.cars = [...payload];
        }
    }
})