
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

// Remove later when pulling in correct image
function imageRandomizer(){
    const arr = [Fred, Dave, Xin];
    return arr[Math.floor(Math.random() * 3) + 0];
}


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

function determineImage(dna, character){
    return character.image ? `assets/images/${character.image}` : imageRandomizer();
}

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

function determineSign(dna){
    const substr = parseInt(dna.substring(6,8));
    console.log(dna, substr);

    switch(true){
        // JavaScript removes first zero, so this is needed for first 100 possibilities
        // Aries = 9
        case (0 <= substr && substr <= 8):
            return 'Aries';
        // Taurus = 9
        case (9 <= substr && substr <= 18):
            return 'Taurus';
        // Gemini = 8
        case (19 <= substr && substr <= 26):
            return 'Gemini';
        // Cancer = 7
        case (27 <= substr && substr <= 33):
            return 'Cancer';
        // Leo = 8
        case (34 <= substr && substr <= 41):
            return 'Leo';
        // Virgo = 10
        case (42 <= substr && substr <= 52):
            return 'Virgo';
        // Libra = 8
        case (53 <= substr && substr <= 60):
            return 'Libra';
        // Scorpio = 9
        case (61 <= substr && substr <= 70):
            return 'Scorpio';
        // Sagittarius = 8
        case (71 <= substr && substr <= 78):
            return 'Sagittarius';
        // Capricorn = 7
        case(79 <= substr && substr <= 85):
            return 'Capricorn';
        // Aquarius = 6
        case(86 <= substr && substr <= 91):
            return 'Aquarius';
        // Pisces = 8
        case(92 <= substr && substr <= 99):
            return 'Pisces';
    }


}

export { determineAlly, determineSkills, determineImage, determineSign };