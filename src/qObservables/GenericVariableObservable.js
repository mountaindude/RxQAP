import { Observable } from "rxjs";
import QixObservable from "./QixObservable";
import extendPrototype from "..//util/qix-extend-prototype";
import outputTypes from "../util/qix-obs-types";

class GenericVariableObservable extends QixObservable {

    constructor(source) {
        super();
        this.source = source;
    }

    lift(operator) {
        const observable = new GenericVariableObservable(); //<-- important part here
        observable.source = this;
        observable.operator = operator;
        return observable;
    }

}

// Add in QIX operators for global
extendPrototype(GenericVariableObservable,"GenericVariable");

// Override any properties that should return observable sub classes
const outputs = outputTypes.GenericVariable;
const qObs = {
};

outputs.forEach(e=>{
    const methodName = e.method;
    const methodNameOrig = methodName.slice(0,1).toUpperCase() + methodName.slice(1);
    const obsClass = qObs[e.obsType];
    GenericVariableObservable.prototype[methodName] = function(...args) {
        return this
            .mergeMap(e=>e[methodNameOrig](...args))
            .let(o=>new obsClass(o));
    };
});


export default GenericVariableObservable;