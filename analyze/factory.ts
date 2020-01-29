import {CarAnalyze} from "./analyze";
import {AssetAnalyze} from './asset';
import {MedicalAnalyze} from './medical'
import {BaseAnalyze} from './base';

let map = {
    'car' : CarAnalyze,
    'asset' : AssetAnalyze,
    'medical' : MedicalAnalyze
}

function getInstance(type : string): any {
    return new map[type]();
}


export{
    getInstance
}