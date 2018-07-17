
import Fred from '../assets/images/fred.png';
import Dave from '../assets/images/sherrif.png';
import Xin from '../assets/images/ninja.png';

import filterborg from '../assets/images/filterborg.png';
import solar_sprite from '../assets/images/solar_sprite.png';
import geothermal_golem from '../assets/images/geothermal_golem.png';
import compost_creature from '../assets/images/compost_creature.png';
import chrono_guy from '../assets/images/chrono_guy.png';
import wild_speaker from '../assets/images/wild_speaker.png';

import allyList from './allyList.json';

// First 3 Digits
function determineAlly(dna){
    const substr = parseInt(dna.substring(0,3));
    //console.log('DNA - ', dna, substr);


    switch(true){
        // JavaScript removes first zero, so this is needed for first 100 possibilities
        case (0 <= substr && substr <= 99):
            return allyList[0];
        case (100 <= substr && substr <= 199):
            return allyList[1];
        case (200 <= substr && substr <= 299):
            return allyList[2];
        case (300 <= substr && substr <= 399):
            return allyList[3];
        case (400 <= substr && substr <= 499):
            return allyList[4];
        case (500 <= substr && substr <= 599):
            return allyList[5];
        case (600 <= substr && substr <= 699):
            return allyList[6];
        case (700 <= substr && substr <= 799):
            return allyList[7];
        case (800 <= substr && substr <= 899):
            return allyList[8];
        case(900 <= substr && substr <= 999):
            return allyList[9];
    }
}

// 4, 5, 6 Digits
function determineSkills(dna, character){
    const skill = parseInt(dna.substring(3,6));
    
    const a = allyList.find((a)=>{
        return a.character === character;
    }).skills;

    const crackedSkills = [];
    switch(true){

        // ONE Skill
        case (0 <= skill && skill <= 31):
            crackedSkills.push(a[0]);
            break;
        case (31 <= skill && skill <= 64):
            crackedSkills.push(a[1]);
            break;
        case (64 <= skill && skill <= 97):
            crackedSkills.push(a[2]);
            break;
        case (97 <= skill && skill <= 130):
            crackedSkills.push(a[3]);
            break;
        case (130 <= skill && skill <= 163):
            crackedSkills.push(a[4]);
            break;

        // TWO SKILLS
        case (163 < skill && skill <= 196):
            crackedSkills.push(a[0], a[1]);
            break;
        case (196 < skill && skill <= 229):
            crackedSkills.push(a[0], a[2]);
            break;
        case (229 < skill && skill <= 262):
            crackedSkills.push(a[0], a[3]);
            break;           
        case (262 < skill && skill <= 295):
            crackedSkills.push(a[0], a[4]);
            break;
        case(295 < skill && skill <= 328):
            crackedSkills.push(a[1], a[2]);
            break;
        case(328 < skill && skill <= 361):
            crackedSkills.push(a[1], a[3]);
            break;
        case(361 < skill && skill <= 394):
            crackedSkills.push(a[1], a[4]);
            break;
        case(394 < skill && skill <= 427):
            crackedSkills.push(a[2], a[3]);
            break;
        case(427 < skill && skill <= 460):
            crackedSkills.push(a[2], a[4]);
            break;
        case(460 < skill && skill <= 493):
            crackedSkills.push(a[3], a[4]);
            break;

        // THREE SKILLS
        case(493 < skill && skill <= 526):
            crackedSkills.push(a[0], a[1], a[2]);
            break;
        case(526 < skill && skill <= 559):
            crackedSkills.push(a[0], a[1], a[3]);
            break;
        case(559 < skill && skill <= 592):
            crackedSkills.push(a[0], a[1], a[4]);
            break;
        case(592 < skill && skill <= 625):
            crackedSkills.push(a[0], a[2], a[3]);
            break;
        case(625 < skill && skill <= 658):
            crackedSkills.push(a[0], a[2], a[4]);
            break;
        case(658 < skill && skill <= 691):
            crackedSkills.push(a[0], a[3], a[4]);
            break;
        case(691 < skill && skill <= 724):
            crackedSkills.push(a[1], a[2], a[3]);
            break;
        case(724 < skill && skill <= 757):
            crackedSkills.push(a[1], a[2], a[4]);
            break;
        case(757 < skill && skill <= 790):
            crackedSkills.push(a[1], a[3], a[4]);
            break;
        case(790 < skill && skill <= 823):
            crackedSkills.push(a[2], a[3], a[4]);
            break;

        // FOUR SKILLS
        case(823 < skill && skill <= 856):
            crackedSkills.push(a[0], a[1], a[2], a[3]);
            break;
        case(856 < skill && skill <= 889):
            crackedSkills.push(a[0], a[1], a[2], a[4]);
            break;
        case(889 < skill && skill <= 922):
            crackedSkills.push(a[0], a[1], a[3], a[4]);
            break;
        case(922 < skill && skill <= 955):
            crackedSkills.push(a[0], a[2], a[3], a[4]);
            break;
        case(955 < skill && skill <= 988):
            crackedSkills.push(a[1], a[2], a[3], a[4]);
            break;

        // FIVE SKILLS
        case(988 < skill && skill <= 999):
            crackedSkills.push(a[0], a[1], a[2], a[3], a[4]);
            break;
        default:
    }
    
    return crackedSkills;

}

// 7, 8 Digits
function determineSign(dna){
    const substr = parseInt(dna.substring(6,8));
    //console.log(dna, substr);

    switch(true){
        // JavaScript removes first zero, so this is needed for first 100 possibilities
        // Aries = 9
        case (0 <= substr && substr <= 8):
            return {value : 'Aries', modifier : 3};
        // Taurus = 9
        case (9 <= substr && substr <= 18):
            return {value : 'Taurus', modifier : 3};
        // Gemini = 8
        case (19 <= substr && substr <= 26):
            return {value : 'Gemini', modifier : 5};
        // Cancer = 7
        case (27 <= substr && substr <= 33):
            return {value : 'Cancer', modifier : 7};
        // Leo = 8
        case (34 <= substr && substr <= 41):
            return {value : 'Leo', modifier : 5};
        // Virgo = 10
        case (42 <= substr && substr <= 52):
            return {value : 'Virgo', modifier : 1};
        // Libra = 8
        case (53 <= substr && substr <= 60):
            return {value : 'Libra', modifier : 5};
        // Scorpio = 9
        case (61 <= substr && substr <= 70):
            return {value : 'Scorpio', modifier : 3};
        // Sagittarius = 8
        case (71 <= substr && substr <= 78):
            return {value : 'Sagittarius', modifier : 5};
        // Capricorn = 7
        case(79 <= substr && substr <= 85):
            return {value : 'Capricorn', modifier : 7};
        // Aquarius = 6
        case(86 <= substr && substr <= 91):
            return {value : 'Aquarius', modifier : 10};
        // Pisces = 8
        case(92 <= substr && substr <= 99):
            return {value : 'Pisces', modifier : 6};
    }


}

// 9th Digit
function determineAlignment(dna){
    const substr = parseInt(dna.substring(8,9));
    //console.log(dna, substr);

    switch(true){
        // Lawful Good
        case (0 === substr):
            return {value : 'Lawful Good', modifier : 10};
        // Neutral Good
        case (1 === substr):
            return {value : 'Neutral Good', modifier : 5};
        // Chaotic Good
        case (2 === substr):
            return {value : 'Chaotic Good', modifier : 10};
        // Lawful Neutral
        case (3 === substr):
            return {value : 'Lawful Neutral', modifier : 5};
        // True Neutral
        case (4 === substr || 5 === substr):
            return {value : 'True Neutral', modifier : 1};
        // Chaotic Neutral
        case (6 === substr):
            return {value : 'Chaotic Neutral', modifier : 5};
        // Lawful Evil
        case (7 === substr):
            return {value : 'Lawful Evil', modifier : 10};
        // Neutral Evil
        case (8 === substr):
            return {value : 'Neutral Evil', modifier : 5};
        // Chaotic Evil
        case (9 === substr):
            return {value : 'Chaotic Evil', modifier : 10};
    }
}
// 10, 11 Digits
function determineColor(dna){
    const substr = parseInt(dna.substring(8,10));
    console.log('!',dna, substr);

    switch(true){
        // JavaScript removes first zero, so this is needed for first 100 possibilities
        // Diamond = 1
        case(0 === substr):
            return {value : 'Diamond', modifier : 10};
        // Amethyst 7
        case (1 <= substr && substr <= 7):
            return {value : 'Amethyst', modifier : 5};
        // Citrine = 7
        case (8 <= substr && substr <= 14):
            return {value : 'Citrine', modifier : 5};
        // Topaz = 7
        case (15 <= substr && substr <= 21):
            return {value : 'Topaz', modifier : 5};
        // Sapphire = 7
        case (22 <= substr && substr <= 28):
            return {value : 'Sapphire', modifier : 5};
        // Garnet = 7
        case (29 <= substr && substr <= 35):
            return {value : 'Garnet', modifier : 5};
        // Emerald = 7
        case (36 <= substr && substr <= 42):
            return {value : 'Emerald', modifier : 5};
        // Ruby = 4
        case (43 <= substr && substr <= 46):
            return {value : 'Ruby', modifier : 7};
        // Onyx = 3
        case (47 <= substr && substr <= 49):
            return {value : 'Onyx', modifier : 8};
        // Default Scheme = 50
        default:
            return { value : null, modifier : 2 }
    }

}

function determinePower(skillCount, sign, alignment, color){
    console.log(skillCount, color);
    let powerDecimal = (skillCount * .4) + (sign * .1) + (alignment * .2) + (color * .3) ;
    let power = Math.floor(powerDecimal * 100);
    return power;
    
}

function decodeAlly(dna){
    const basics =  determineAlly(dna);
    const color = determineColor(dna);
    const skills = determineSkills(dna, basics.character);
    const sign = determineSign(dna);
    const alignment = determineAlignment(dna);
    
    const ally = {
        basics,
        image : `assets/images/${basics.image}`,
        skills : skills,
        sign : sign.value,
        alignment : alignment.value,
        color : color.value,
        power : determinePower(skills.length, sign.modifier, alignment.modifier, color.modifier)
    };

    console.log('POWER',ally.power);
    return ally;

}
export { decodeAlly };