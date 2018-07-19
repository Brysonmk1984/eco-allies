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
import Scorpio from '../../assets/images/sign/scorpio.png';
import LawfulGood from '../../assets/images/alignment/lawful_good.png';

export default class VariantBar extends React.Component{

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
  

    render(){
        return(
            <div className="variant_bar">
                
                <div className="variant sign_variant">
                    <img src={Scorpio} />
                </div>
                <div className="variant alignment_variant">
                    <img src={LawfulGood} />
                </div>
                { this.renderStoneVariant() }
            </div>
        );
    }
}