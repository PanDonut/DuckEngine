/**
 * 
 * @param {Number} current 
 * @param {Number} to 
 * @param {Number} time 
 * @param {Number} delta 
 * @param {Function} setF
 * @returns 
 */

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