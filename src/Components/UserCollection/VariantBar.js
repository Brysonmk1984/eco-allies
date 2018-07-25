import React from 'react';
import Diamond from '../../assets/images/color/diamond.png';
import Topaz from '../../assets/images/color/topaz.png';
import Emerald from '../../assets/images/color/emerald.png';
import Sapphire from '../../assets/images/color/sapphire.png';
import Amethyst from '../../assets/images/color/amethyst.png';
import Onyx from '../../assets/images/color/onyx.png';
import FireOpal from '../../assets/images/color/fire_opal.png';
import Ruby from '../../assets/images/color/ruby.png';
import Citrine from '../../assets/images/color/citrine.png';
import Aquarius from '../../assets/images/sign/aquarius.png';
import Aries from '../../assets/images/sign/aries.png';
import Cancer from '../../assets/images/sign/cancer.png';
import Capricorn from '../../assets/images/sign/capricorn.png';
import Gemini from '../../assets/images/sign/gemini.png';
import Libra from '../../assets/images/sign/libra.png';
import Pisces from '../../assets/images/sign/pisces.png';
import Scorpio from '../../assets/images/sign/scorpio.png';
import Taurus from '../../assets/images/sign/taurus.png';
import Virgo from '../../assets/images/sign/Virgo.png';
import LawfulGood from '../../assets/images/alignment/lawful_good.png';
import LawfulNeutral from '../../assets/images/alignment/lawful_neutral.png';
import LawfulEvil from '../../assets/images/alignment/lawful_evil.png';
import NeutralGood from '../../assets/images/alignment/neutral_good.png';
import TrueNeutral from '../../assets/images/alignment/true_neutral.png';
import NeutralEvil from '../../assets/images/alignment/neutral_evil.png';
import ChaoticGood from '../../assets/images/alignment/chaotic_good.png';
import ChaoticNeutral from '../../assets/images/alignment/chaotic_evil.png';
import ChaoticEvil from '../../assets/images/alignment/chaotic_evil.png';

export default class VariantBar extends React.Component{
    renderSignVariant(){
        const sign = this.props.sign;
        let signImage;
        switch(true){
            case (sign === 'Aquarius'):
                signImage = Aquarius;
                break;
            case (sign === 'Aries'):
                signImage = Aries;
                break;
            case (sign === 'Cancer'):
                signImage = Cancer;
                break;
            case (sign === 'Capricorn'):
                signImage = Capricorn;
                break;
            case (sign === 'Gemini'):
                signImage = Gemini;
                break;
            case (sign === 'Libra'):
                signImage = Libra;
                break;
            case (sign === 'Pisces'):
                signImage = Pisces;
                break;
            case (sign === 'Scorpio'):
                signImage = Scorpio;
                break;
            case (sign === 'Taurus'):
                signImage = Taurus;
                break;
            case (sign === 'Virgo'):
                signImage = Virgo;
                break;
            default:
                signImage = Scorpio;
                break;
        }

        if(this.props.sign){
            return (
                <div className="variant sign_variant">
                    <img src={signImage} title={this.props.sign} />
                </div>
            )
        }
    }
    
    renderStoneVariant(){
        const stone = this.props.color;
        let stoneImage;
        switch(true){
            case (stone === 'Diamond'):
                stoneImage = Diamond;
                break;
            case (stone === 'Sapphire'):
                stoneImage = Sapphire;
                break;
            case (stone === 'Amethyst'):
                stoneImage = Amethyst;
                break;
            case (stone === 'Fire Opal'):
                stoneImage = FireOpal;
                break;
            case (stone === 'Topaz'):
                stoneImage = Topaz;
                break;
            case (stone === 'Emerald'):
                stoneImage = Emerald;
                break;
            case (stone === 'Onyx'):
                stoneImage = Onyx;
                break;
            case (stone === 'Ruby'):
                stoneImage = Ruby;
                break;
            case (stone === 'Citrine'):
                stoneImage = Citrine;
                break;
        }

        if(this.props.color){
            return (
                <div className="variant color_variant">
                    <img src={stoneImage} title={this.props.color} />
                </div>
            )
        }
    }

    renderAlignmentVariant(){
        const alignment = this.props.alignment;
        let alignmentImage;

        switch(true){
            case (alignment === 'Lawful Good'):
                alignmentImage = LawfulGood;
                break;
            case (alignment === 'Lawful Neutral'):
                alignmentImage = LawfulNeutral;
                break;
            case (alignment === 'Lawful Evil'):
                alignmentImage = LawfulEvil;
                break;
            case (alignment === 'Neutral Good'):
                alignmentImage = NeutralGood;
                break;
            case (alignment === 'True Neutral'):
                alignmentImage = TrueNeutral;
                break;
            case (alignment === 'Neutral Evil'):
                alignmentImage = NeutralEvil;
                break;
            case (alignment === 'Chaotic Good'):
                alignmentImage = ChaoticGood;
                break;
            case (alignment === 'Chaotic Neutral'):
                alignmentImage = ChaoticNeutral;
                break;
            case (alignment === 'Chaotic Evil'):
                alignmentImage = ChaoticEvil;
                break;
        }
        if(this.props.alignment){
            return (
                <div className="variant color_variant">
                    <img src={alignmentImage} title={this.props.alignment} />
                </div>
            )
        }
    }
  

    render(){
        return(
            <div className="variant_bar">
                { this.renderSignVariant() }
                { this.renderAlignmentVariant() }
                { this.renderStoneVariant() }
            </div>
        );
    }
}