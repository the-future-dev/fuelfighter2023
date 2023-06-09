import React, {useState, useEffect } from 'react';
import { Controller, Scene } from 'react-scrollmagic';
import { useNavigate } from 'react-router-dom';

import blogService from '../../_services/blog.services';

import ArticlePreview from './ArticlePreview.jsx';

import "../../styles/pageStyles/home/blogPreview.css";

export default function BlogPreview() {
    const navigate = useNavigate();
    const goInside = (id) => {
        navigate(`/blog/${id}`, {
            state: {
                id: id
            }
        })
    }

    const [posts, setPosts] = useState();
	const [selected, setSelected] = useState();
    const [nextSelected, setNextSelected] = useState();
    const [index, setIndex] = useState();
    const size = 4;

    if(!posts){
        blogService.blogposts(size)
        .then(json => setPosts(json))
        .then(() => {
            if (!index){
                setIndex(0);
            }
        })
    }

    const nextPreview = () => {        
        if (index < size-1){
            let x = document.getElementById("primaryImgBlog");
            x.classList.add("slideOutAnimation");
            setTimeout(() =>{
                x.classList.remove("slideOutAnimation");

                setIndex(index+1);
                let y = document.getElementById("firstArticle");
                let z = document.getElementById("secondArticle");

                x.classList.add("slideInAnimation");
                y.classList.add("fadeInLeftAnimation");
                z.classList.add("fadeInLeftAnimation");
                setTimeout(() => {
                    x.classList.remove("slideInAnimation");
                    y.classList.remove("fadeInLeftAnimation");
                    z.classList.remove("fadeInLeftAnimation");
                }, 1000);
            }, 100);
        }
    }
    const prevPreview = () => {
        if (index > 0) {
            let x = document.getElementById("primaryImgBlog");
            let z = document.getElementById("secondArticle");
            x.classList.add("slideOutAnimation");
            z.classList.add("slideOutAnimation");

            setTimeout(() => {
                x.classList.remove("slideOutAnimation");
                z.classList.remove("slideOutAnimation");

                setIndex(index-1);
                let y = document.getElementById("firstArticle");

                x.classList.add("slideInAnimation");
                y.classList.add("fadeInRightAnimation");
                z.classList.add("fadeInRightAnimation");
                
                setTimeout(() => {
                    y.classList.remove("fadeInRightAnimation");
                    z.classList.remove("fadeInRightAnimation");
                    x.classList.remove("slideInAnimation");
                }, 750);
            }, 100);
        }
    }
    
    useEffect( () =>{
        if (posts){
            setSelected(posts[index])
            if (index === size-1){
                setNextSelected()
            } else{
                setNextSelected(posts[index+1])
            }
        }
    }, [index, posts]);

    return (
        <Controller>
        <Scene duration={600} triggerHook="onEnter">
            {(progress) => (
        <section className='blogPreview' style={{ opacity: progress }}>
            <h2>Blog Preview</h2>
            <h5>We at Fuel Fighter NTNU want to share our experience with our friends, family, and anyone else interested in what we do. In this blog, we'll cover the challenges, and achievements in designing and producing the car from scratch, as well as competing at an international level.</h5>
            <div id="inside">
                {selected ? <img src={selected.image} id="primaryImgBlog" className="" alt="primary article img" onClick={() => goInside(selected.id)}/>:<></>}
                
                <div className='articleViewHome' id='firstArticle'>
                    {selected ?
                    <ArticlePreview key = {selected.id}
                        id = {selected.id}
                        title={selected.title}
                        description={selected.description}
                        author={selected.author}
                        date={selected.date}
                        image={selected.image}/>
                    : <></>}
                </div>

                <div className='articleViewHome' id='secondArticle'>
                    {nextSelected ?
                    <ArticlePreview key = {nextSelected.id}
                        id = {nextSelected.id}
                        title={nextSelected.title}
                        description={nextSelected.description}
                        author={nextSelected.author}
                        date={nextSelected.date}
                        image={nextSelected.image}/>
                    : <></>}
                </div>
            </div>
            <div className='buttonsBlogPreview'>
                <div onClick={prevPreview}>
                    <i className="bi bi-caret-left-fill"></i>
                </div>
                {selected?
                    posts?.map((post) => {
                        let idBullet = (post.id === selected.id) ? "selectedBullet" : "";
                        return(
                            <i className="bi bi-dot" id={idBullet} key={post.id}></i>
                        )
                    })
                    : <></>
                }
                <div onClick={nextPreview}>
                    <i className="bi bi-caret-right-fill"></i>
                </div>
            </div>
        </section>
         )}
         </Scene>
     </Controller>
    )
}
