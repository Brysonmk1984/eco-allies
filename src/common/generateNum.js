import seedRandom from 'seedrandom';
let rng = new seedRandom();

function generateSeed(){
    return Math.floor(rng()*100000000000);
}

export default generateSeed;

