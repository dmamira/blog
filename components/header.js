import React from 'react'
import Link from 'next/link';

export default class extends React.Component {
    render(){
        return(
            <div className="header">
            <Link href="/"><a className="title">Dai's Tech Blog</a></Link>
        <style jsx>{`
        .header{
            height:60px;
        }
        a{
            line-height:60px;
            user-select:none;
            font-size:20px;
            color:black;
            text-decoration:none;
            margin-left:20px;
            vartical-align:middle;
        }
        .title{
            font-size:28px;
        }
        `}</style>
            </div>
        )
    }
}