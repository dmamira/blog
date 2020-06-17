import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import parse from 'html-react-parser';
import { TwitterShareButton } from 'react-share'
import TwitterIcon from '@material-ui/icons/Twitter'
import Head from 'next/head'

interface Props {
    posts: {
        id: string,
        createdAt: string,
        updatedAt: string,
        title: string,
        body: string,
        tags: [
            {
                id: string,
                createdAt: string,
                updatedAt: string,
                tags: string
            }
        ]
        description: string,
        image?: {
            url: string
        }
    }
}

export const getStaticProps = async ctx => {
    const posts = await fetch(`https://dai.microcms.io/api/v1/posts/${ctx.params.id}`, {
        method: 'GET',
        headers: {
            'X-API-KEY': process.env.APIKEY
        }
    });
    return { props: { posts: await posts.json() } }
}

export const getStaticPaths = async () => {
    const response = await fetch(`https://dai.microcms.io/api/v1/posts?limit=1000`, {
        method: 'GET',
        headers: {
            'X-API-KEY': process.env.APIKEY
        }
    });
    const posts = await response.json();
    const paths = posts.contents.map(one => {
        return { params: { id: one.id } }
    });
    return { paths: paths, fallback: false }
}

const Posts = (props: Props) => {
    const transform = node => {
        if (node.name === 'code') {
            return React.createElement(SyntaxHighlighter, { language: 'javascript', style: darcula }, node.children[0].data);
        }
    }
    const shareButtonStyle = {
        height: '24px'
    }
    return (
        <div className='postWrapper'>
            <Head>
                <title>{props.posts.title} - Dai's blog</title>
                <meta name='description' content={props.posts.description} />
                <meta name='twitter:card' content='summary_large_image' />
                <meta name='twitter:site' content='@dmarai0422' />
                <meta name='og:title' content={`${props.posts.title}`} />
                <meta name='og:description' content={props.posts.description} />
                <meta name='og:url' content={`https://blog.dai.gd/posts/${props.posts.id}`} />
                <meta name='og:image' content={props.posts.image ? props.posts.image.url : ''} />
            </Head>
            <h1>{props.posts.title}</h1>
            <p className='lastUpdate'>最終更新日:{props.posts.updatedAt.split('T')[0]}</p>
            <div className="shareButtonWrapper">
                <TwitterShareButton title={props.posts.title} style={shareButtonStyle} url={`https://blog.dai.gd/posts/${props.posts.id}`}>
                    <TwitterIcon />
                </TwitterShareButton>
            </div>
            {parse(props.posts.body, { replace: transform })}
            {props.posts.tags.map(currentItem => {
                return (
                    <div style={{ marginBottom: '20px', marginRight: '5px', display: 'inline-block', marginTop: '20px', backgroundColor: '#F2F2F2', padding: '5px 10px' }}>
                        <p style={{ display: 'inline-block', color: '#757575', fontSize: '15px', lineHeight: '1.2em', marginTop: '0px', padding: '0px' }}>{currentItem.tags}</p>
                    </div>
                )
            })}
            <style>{

                `
                    p{
                        margin-top:0.86em;
                        font-size:20px;
                        margin-bottom:0px;
                        line-height:1.9;
                    }
                    h2{
                        margin-top:30px;
                        font-size:27px;
                        margin-bottom:0px;
                    }
                    h3{
                        font-size:23px;
                        margin:15px 0px;
                    }
                    blockquote {
                        position: relative;
                        margin: 2em 0;
                        padding: 1em 1em 1em 2.6em;
                        font-size: 1.1em;
                        border-left: 5px solid #CCC;
                        border-radius: 2px;
                    }
                    blockquote:after{
                        position: absolute;
                        bottom: 0;
                        right: 0;
                        content: '”';
                        font-family: sans-serif;
                        font-size: 6em;
                        opacity: .1;
                    }
                    img,iframe{
                       position:relative;
                       left:50%;
                       top:0px;
                       transform:translateX(-50%);
                       max-width:100%;
                    }
                    twitter-widget{
                        margin:auto;
                        max-width:100%;
                    }
                    `
            }
            </style>
            <style jsx>{`
        .postWrapper{
            width:100%;
            max-width:680px;
            margin:auto;
            position:relative;
            top:20px;
            padding:0px 20px;
            box-sizing:border-box;
        }
        .shareButtonWrapper{
            display:flex;
            flex-wrap:wrap;
            align-items:flex-end;
            justify-content:flex-end;
        }
        .postInfo{
            margin-top:0px;
            margin-left:10px;
            display:inline-block;
            vertical-align:top;
            font-size:16px;
        }
        .date{
            display:inline-block;
            text-align:left;
        }
        h1{
            font-size:40px;
            margin-top:0px;
            margin-bottom:0px;
        }
        .lastUpdate{
            font-size:20px;
        }
        .shareMessage{
            position:relative;
            font-size:20px;
            text-align:right;
        }
        .shareVia{
            margin-top:0px;
            margin-bottom:0px;
            margin-right:10px;
            display:inline-block;
            line-height:24px;
        }
        .coverImage{
            max-width:100%;
        }
        `}</style>
        </div>
    )
}

export default Posts;