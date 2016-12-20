import { Observable } from "rxjs";
import engineWrapper from "../engine-wrapper";


export default function(proto,type) {
    const methods = engineWrapper[type];
    const methodNames = Object.keys(methods);

    methodNames.forEach(methodName => {
        const method = methods[methodName];
       // const methodCamel = methodName.slice(0,1).toLowerCase() + methodName.slice(1);
        const operatorName = "q" + methodName;
        
        proto.prototype[operatorName] = function(...args) {
            const responseObservable = this
                .mergeMap(e=>e[methodName](...args));
            
            const observable = new Observable();
            observable.source = responseObservable;
            return observable;
                    // .publishLast().refCount() if we want these hot   
        }
    });
}