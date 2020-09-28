import React from 'react'
import WrapLink from './WrapLink';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Panel, SearchBox,RefinementList } from 'react-instantsearch-dom';

const Header = () => {
    return (
        <div className="header">
            <WrapLink href="/"><a className="title">Dai's Tech Blog</a></WrapLink>
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

export default Header;
