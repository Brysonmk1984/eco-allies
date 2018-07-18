import React from 'react';
import Diamond from '../../assets/images/color/diamond.png';
import Scorpio from '../../assets/images/sign/scorpio.png';
import LawfulGood from '../../assets/images/alignment/lawful_good.png';

export default class VariantBar extends React.Component{
    render(){
        return(
            <div className="variant_bar">
                <div className="variant color_variant">
                    <img src={Diamond} />
                </div>
                <div className="variant sign_variant">
                    <img src={Scorpio} />
                </div>
                <div className="variant alignment_variant">
                    <img src={LawfulGood} />
                </div>
            </div>
        );
    }
}