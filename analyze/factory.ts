import {CarAnalyze} from "./analyze";
import {AssetAnalyze} from './asset';
import {BaseAnalyze} from './base';

let map = {
    'car' : CarAnalyze,
    'asset' : AssetAnalyze
}

function getInstance(type : string): any {
    return new map[type]();
}


export{
    getInstance
}