import Ref from "@/Ref";

export const AutoClicker = {
    name: "autoclicker",
    cookiesPerSecond: 1,
    basePrice: 15
}

export const GrandMa = {
    name: "grandma",
    cookiesPerSecond: 30000,
    basePrice: 100
}


export const Factory = {
    name: "factory",
    cookiesPerSecond: 16,
    basePrice: 1000
}


export type CookieGenerator = {
    name: string,
    cookiesPerSecond: number,
    basePrice: number
}


class State {
    cookieCount: Ref<number>;
    cookiesPerClick: Ref<number>;
    generators: Ref<Map<CookieGenerator, number>>

    constructor() {
        this.cookiesPerClick = new Ref(1);
        this.cookieCount = new Ref(0);
        this.generators = new Ref(new Map<CookieGenerator, number>());
    }

    addCookies(addition: number) {
        document.title = "Cookieclicker | " + Math.round(state.cookieCount.value);
        this.cookieCount.value += addition;
    }

    buy(generator: CookieGenerator) {
        if (this.canBuy(generator)) {
            this.cookieCount.value -= this.calculatePrice(generator);
            this.generators.value.set(generator, (this.generators.value.get(generator) || 0) + 1);
        }
    }

    calculatePrice(generator: CookieGenerator) {
        const amount = this.generators.value.get(generator) || 0;
        return Math.round((1+ Math.pow(amount, 0.6 * Math.E)) * generator.basePrice);
    }

    canBuy(generator: CookieGenerator) {
        const price = this.calculatePrice(generator);
        return this.cookieCount.value >= price;
    }

    calculateClickPerSecond() {
        let clicks = 0;

        for (const [generator, count] of this.generators.value.entries()) {
            clicks += (generator.cookiesPerSecond * count)
        }

        return clicks;
    }
}

const state = new State();
export default state;