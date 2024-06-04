import {createServer, Factory, Model} from "miragejs"
import {faker} from '@faker-js/faker';

export function makeServer({environment = "development"} = {}) {
    return createServer({
        environment,

        models: {
            car: Model,
        },

        factories: {
            car: Factory.extend({
                brand() {
                    return faker.vehicle.vehicle()
                },

                model() {
                    return faker.vehicle.model()
                },

                colour() {
                    return faker.vehicle.color()
                },

                fuel() {
                    return faker.vehicle.fuel()
                },

                price() {
                    return faker.commerce.price({min: 12000, max: 30000, dec: 0})
                },

                pricePerMonth() {
                    return faker.commerce.price({min: 100, max: 1000, dec: 0})
                },

                year() {
                    return faker.date.birthdate({min: 2000, max: 2024, mode: 'year'}).getFullYear()
                },

                image() {
                    return faker.image.urlLoremFlickr({
                        // we only care about what's before the first space
                        category: this.brand.substring(0, this.brand.indexOf(' ')),
                        width: 800,
                        height: 500
                    });
                },

                isTrending() {
                    return Math.random() < 0.3
                },

                isHot() {
                    return Math.random() < 0.2
                },

            })
        },

        seeds(server) {
            server.createList('car', 24)
        },

        routes() {
            this.namespace = "api"

            this.get("/cars", (schema) => {
                return schema.cars.all()
            })
        },
    })
}