import Connection from "./connection";
import QixGlobal from "./qix-classes/qix-global";
import { Observable } from "rxjs";

// Generator for sequence ids
const seqId = function* () {
    var index = 1;
    while(true) yield index++;
}

export default class EngineSession {
    constructor(config) {
        
        // Internals
        const handle = -1;
        const seqGen = seqId();

        //const wsTraffic = new Connection(config);
        const wsObs = new Connection(config); 
        // -> should return an object with 3 observables that are useful for making API calls

        // Public
        this.obs = wsObs;
        this.seqGen = seqGen;
        this.config = config;
        
        // Once passed authentication, return the engine session
        return wsObs.wsPassed
            .mapTo(this);
             
    }

    getGlobal() {
        return new QixGlobal(this,-1);
    }
};

