import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

//css
import '../../styles/pageStyles/blog/blogPage.css';
import '../../styles/shared.css';

//Backend service
import blogService from '../../_services/blog.services';

export default function ArticlePage({state}) {
    const [blogpost, setBlogPost] = useState();
	const location = useLocation();

	const id = location.state.id;

    useEffect(() => {
		blogService.blogpost(id)
			.then(res => {
				if (res === false) {
					goBack()
				} else {
					setBlogPost(res)
				}
			})
	}, [id])

	const goBack = () => window.history.back()

	const formatDate = (milliseconds) => {
		const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
		var date = new Date(+milliseconds);
		return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
	}

	const shareLink = `https://www.fuelfighter.no/share.php?type=blog&id=${blogpost?.id}`

    return(
		<div id="articlePageContainer">
		<section id="articleSpanner">
			<div id="arrowBack" onClick={goBack}>
				{/* <p>BLOG</p> */}
				<i class="bi bi-arrow-90deg-left"></i>
			</div>

		</section> 
            {!blogpost ?  <></> :
            <div id="articleContainer">
                <article>
					<header>
						<h2 id="articleTitle">{blogpost.title}</h2>
						<div id="dateAuthor">
							<time dateTime={blogpost.date}>{formatDate(blogpost.date)}</time>
							<h7 id="artAuthor">{blogpost.author}</h7>
						</div>
						{blogpost.bannerImage ? <figure>
							<img id="articleImg" alt="banner" src={blogpost.bannerImage} />
						</figure> : <></>}
						<p id="descriptionArticle">{blogpost.description}</p>
					</header>
					<section id="derivedHTML" dangerouslySetInnerHTML={{ __html: blogpost.content }} />
					</article>
					<hr />
					<div className="grid">
						<div className="two-thirds">
							<h2>Thank you for reading</h2>
							<p>We want to thank you for your interest in the blog. You can find more articles like this on our <a href="/blog">blog</a></p>
							<h3>Share</h3>
							<a href={`https://www.facebook.com/sharer/sharer.php?u=${shareLink}`} target="_blank" rel="noopener noreferrer" className="blogpost-share" title="facebook"><i className='bi bi-facebook'></i></a>
							{/* <CopyToClipboard text={shareLink}> */}
								<span className="blogpost-share" title="copy"><i class="bi bi-clipboard"></i></span>
							{/* </CopyToClipboard> */}
						</div>
					</div>
            </div>
			}
        </div>
    )
}