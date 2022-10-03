/**
 * 
 * @param {Number} current 
 * @param {Number} to 
 * @param {Number} time 
 * @param {Number} delta 
 * @param {Function} setF
 * @returns 
 */

import { Euler } from "three";
import { Vector3 } from "three";

export function FInterp(current, to, time, delta, setF) {
    // console.log(current, to, time)
        var eValue = setInterval(function () {
            // console.log(current, to);
            if (to > current) {
                setF(current += time);
                if (current > to) {
                    clearInterval(eValue)
                }
            }  
            if (to < current) {
                setF(current -= time);
                if (current < to) {
                    clearInterval(eValue)
                }
            }         
        }, delta);
}

/**
 * 
 * @param {Vector3} from 
 * @param {Vector3} to 
 * @param {Number} time 
 * @param {Number} delta 
 * @param {Function} setF
 * @returns 
 */

export function VInterp(from, to, time, delta, setF) {
    var current = 0;
    var VBase = [];
    var VTo = [];   
    var eValue = setInterval(function () {
        from.toArray(VBase)       
        var vec = new Vector3().fromArray([
            clamp(current, 0, 100, VBase[0], VTo[0]),
            clamp(current, 0, 100, VBase[1], VTo[1]),
            clamp(current, 0, 100, VBase[2], VTo[2])
        ]);
        setF(vec)
        current += time;
        if (current == 100) {
            clearInterval(eValue)
        }      
        console.log(from, to, time, delta, current)
    }, delta);
}

/**
 * 
 * @param {Euler} from 
 * @param {Euler} to 
 * @param {Number} time 
 * @param {Number} delta 
 * @param {Function} setF
 * @returns 
 */

export function EInterp(from, to, time, delta, setF) {
    var current = 0;
    var VBase = [];
    var VTo = [];   
    var eValue = setInterval(function () {
        VBase = from.toArray()     
        VTo = to.toArray()     
        var vec = new Euler().fromArray([
            clamp(current, 0, 100, VBase[0], VTo[0]),
            clamp(current, 0, 100, VBase[1], VTo[1]),
            clamp(current, 0, 100, VBase[2], VTo[2]),
            "XYZ"
        ]);
        setF(vec)
        current += time;
        if (current == 100) {
            clearInterval(eValue)
        }      console.log(VTo)
        console.log(from, to, time, delta, current, vec)
    }, delta);
}

/**
 * 
 * @param {Number} current 
 * @param {Number} to 
 * @param {Number} time 
 * @param {Number} delta 
 * @param {Function} setF
 * @returns 
 */

export function FInterpFromConst(currentconst, to, time, delta, setF) {
    const current = currentconst;
    // console.log(current, to, time)
        var eValue = setInterval(function () {
            // console.log(current);
            if (to > current) {
                setF(current += time);
                if (current > to) {
                    clearInterval(eValue)
                }
            }  
            if (to < current) {
                setF(current -= time);
                if (current < to) {
                    clearInterval(eValue)
                }
            }         
        }, delta);
}

/**
 * 
 * @param {Number} max 
 * @param {Number} min 
 * @returns Random number in given range
 */

export function RandomFloatInRange(max, min) {
    return Math.random() * (max - min) + min
}

export const clamp = (val, in_min, in_max, out_min, out_max) =>
  ((val - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;