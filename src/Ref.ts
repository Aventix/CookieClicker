import {ref, Ref as VueRef, unref} from "vue";

export default class Ref<T> {
    private readonly _value : VueRef<any>;
    private callbacks: Array<(oldValue: T, newValue: T)=>void>;

    constructor(value: T) {
        this._value = <any>ref(value);
        this.callbacks = [];
    }


    get value(): T {
        return unref(this._value) as unknown as T;
    }

    set value(value: T) {
        const oldValue = this.value;
        this._value.value = value as unknown as T;
        this.callbacks.forEach(callback => {
            callback.call(undefined, oldValue, this.value);
        })
    }

    get ref(): VueRef<T> {
        return this._value;
    }

    watch(callback: (oldValue: T, newValue: T) => void) {
        this.callbacks.push(callback);
    }
}

