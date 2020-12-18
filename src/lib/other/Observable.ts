import { uniqueString } from "../utils";

export type Observer<T> = (value: T) => void;

export class Observable<T> {

    public get value(): T { 
        return this._value; 
    }

    public set value(newValue: T) { 
        this._value = newValue; this.notify(); 
    }

    private observers: Map<string, Observer<T>> = new Map<string, Observer<T>>();

    constructor(private _value: T) {}

    public add(observer: Observer<T>): string {
        const key: string = uniqueString();
        this.observers[key] = observer;
        return key;
    }

    public set(key: string, observer: Observer<T>): string {
        this.observers[key] = observer;
        return key;
    }

    public remove(key: string) {
        this.observers.delete(key);
    }

    public notify() {
        for (const key of this.observers.keys()) {
            this.observers.get(key)(this.value);
        }
    }
}