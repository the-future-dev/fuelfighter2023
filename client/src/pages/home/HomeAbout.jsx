import React, { useEffect } from 'react';
import imgValues from '../../assets/pages/home/value1.jpg'

import '../../styles/pageStyles/home/homeAbout.css';

export default function HomeAbout() {
    const slideInLeftOptions = {
        rootMargin: '0px',
        threshold: 0.5
      };
    

    useEffect(() => {
    
        const homeSectionOne = document.querySelector('#homeSection1');
        const homeSectionSecond = document.querySelector('#homeSectionInverted');
        const homeSectionThird = document.querySelector('#homeSection3');
    
        const slideInLeftObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
            });
        }, slideInLeftOptions);
        
        slideInLeftObserver.observe(homeSectionOne);
        slideInLeftObserver.observe(homeSectionThird);
        slideInLeftObserver.observe(homeSectionSecond);
        
    }, [slideInLeftOptions]);
    return(
        <div className="homeAbout">
                <div className="homeSection slide-in-left" id="homeSection1">
                    <div className="testoHomeSections">
                        <h1>Inspire a sustainable future</h1>
                        <p>Our Motto and Values</p>
                    </div>
                    <div className="valuesImgContainer">
                        <img id="imgHomeAbout" className="come-in" alt="img values " src={imgValues} />
                    </div>
                </div>

                <div className="slide-in-right" id="homeSectionInverted">
                    <div className="valuesImgContainer" >
                        <img id="imgHomeAboutInv" alt="img values " src={imgValues} />
                    </div>
                    <div className="testoHomeSections">
                        <h1>Our Mission</h1>
                        <p>to make things sustainable</p>
                        <p></p>
                    </div>
                </div>

                <div className="homeSection slide-in-left" id="homeSection3">
                    <div className="testoHomeSections">
                        <h1>Our Goals</h1>
                        <p>Fn-målene</p>
                        <p></p>
                    </div>
                    <div className="valuesImgContainer">
                        <img id="imgHomeAbout" alt="img values " src={imgValues} />
                    </div>
                </div>
            </div>
    )
}