import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CardMedia from '@material-ui/core/CardMedia'
import CardActions from '@material-ui/core/CardActions'
import ShareIcon from '@material-ui/icons/Share';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import TwitterIcon from '@material-ui/icons/Twitter'
import { TwitterShareButton } from 'react-share'
import Pagination from '@material-ui/lab/Pagination'
import Router from 'next/router'
import Head from 'next/head'

const PostCard = props => {
  const [isOpenShareMenu, setIsOpenSharemenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  useEffect(() => {
    if (props.number == 1) Router.push('/');
  }, []);
  const OpenShareMenu = (e: React.MouseEvent<HTMLInputElement,MouseEvent>) => {
    e.preventDefault();
    setIsOpenSharemenu(true);
    setAnchorEl(e.currentTarget);
  }
  const clickShareButton = (e: React.MouseEvent<HTMLLIElement,MouseEvent>, title, id) => {
    e.preventDefault();
    const width = (window.screen.width - 500) / 2;
    const height = (window.screen.height - 500) / 2;
    window.open(`http://twitter.com/share?url=https://blog.dai.gd/posts/${id}&text=${title}&related=[${process.env.twitterID}]`, null, `width=500,height=500,left=${width},height=${height}`);
  }
  const closeSharemenu = (e: React.MouseEvent<HTMLLIElement,MouseEvent>) => {
    e.preventDefault();
    setIsOpenSharemenu(false);
  }
  const onChangePage = (e:React.MouseEvent<HTMLLIElement,MouseEvent>, p) => {
    if (p == 1) {
      Router.push('/');
    }
    Router.push(`/page/[number]`, `/page/${p}`)
  }
  return (
    (
      <>
        {props.posts.contents.map(one => {
          return (
            <div className="card" key={one.id}>
              <Head>
                <title>Dai's Blog</title>
                <meta name='description' content='思ったことを書き連ねます。' />
                <meta name='twitter:card' content='summary' />
                <meta name='twitter:site' content='@dmarai0422' />
                <meta name='og:title' content="Dai's Blog" />
                <meta name='og:description' content='思ったことを書き連ねます。' />
                <meta name='og:url' content={`https://blog.dai.gd/`} />
                <meta name='og:image' content='https://blog.dai.gd/icon.png' />
              </Head>
              <Link href="/posts/[id]" as={`/posts/${one.id}`}>
                <a>
                  <Card>
                    <img style={{ width: "100%", maxHeight: "300px", "objectFit": "cover" }} src={one.image ? one.image.url : ""} />
                    <CardContent>
                      <h1>{one.title}</h1>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {one.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <IconButton onClick={OpenShareMenu}>
                        <ShareIcon />
                      </IconButton>
                      <Menu open={isOpenShareMenu} onClose={closeSharemenu} anchorEl={anchorEl}>
                        <MenuItem onClick={(e:React.MouseEvent<HTMLLIElement,MouseEvent>) => { clickShareButton(e, one.title, one.id) }}>
                          <ListItemIcon>
                            <TwitterIcon />
                          </ListItemIcon>
                          Twitterでシェア
                        </MenuItem>
                      </Menu>
                    </CardActions>
                  </Card>
                </a>
              </Link>
            </div>
          )
        })}
        <div className="paginationWrapper">
          <Pagination onChange={onChangePage} defaultPage={Number(props.number || 1)} count={Math.ceil(props.posts.totalCount / props.posts.limit)} variant="outlined" shape="rounded" color="primary" />
        </div>
        <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap');
        a{
          font-family: 'Noto Sans JP', sans-serif;
          color : white;
          text-decoration:none;
        }
        .card{
          width:100%;
          max-width:680px;
          margin:auto;
          margin-bottom:20px;
          padding:0px 20px;
          box-sizing:border-box;
        }
        .paginationWrapper{
          width:100%;
          display:flex;
          justify-content: center;
          margin-bottom:20px;
        }
        h1{
          margin-top:0px;
        }
        `}</style>
      </>
    )
  )
}

export default PostCard;