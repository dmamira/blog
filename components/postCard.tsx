import React, { useEffect, useState } from "react";
import Link from "next/link";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import ShareIcon from "@material-ui/icons/Share";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import TwitterIcon from "@material-ui/icons/Twitter";

interface Props {
  post: {
    id: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    body: string;
    tags: [
      {
        id: string;
        createdAt: string;
        updatedAt: string;
        tags: string;
      }
    ];
    description: string;
    image?: {
      url: string;
    };
  };
}

const PostCard = (props: Props) => {
  const [isOpenShareMenu, setIsOpenSharemenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const OpenShareMenu = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();
    setIsOpenSharemenu(true);
    setAnchorEl(e.currentTarget);
  };
  const clickShareButton = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    title,
    id
  ) => {
    e.preventDefault();
    const width = (window.screen.width - 500) / 2;
    const height = (window.screen.height - 500) / 2;
    window.open(
      `http://twitter.com/share?url=https://blog.dai.gd/posts/${id}&text=${title}&related=[${process.env.twitterID}]`,
      null,
      `width=500,height=500,left=${width},top=${height}`
    );
  };
  const closeSharemenu = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.preventDefault();
    setIsOpenSharemenu(false);
  };

  const { id, image, title, description } = props.post;
  return (
    <>
      <div className="card" key={id}>
        <Link href="/posts/[id]" as={`/posts/${id}`}>
          <a>
            <Card>
              <img
                style={{
                  width: "100%",
                  maxHeight: "300px",
                  objectFit: "cover",
                }}
                src={image ? image.url : ""}
              />
              <CardContent>
                <h1>{title}</h1>
                <Typography variant="body2" color="textSecondary" component="p">
                  {description}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton onClick={OpenShareMenu}>
                  <ShareIcon />
                </IconButton>
                <Menu
                  open={isOpenShareMenu}
                  onClose={closeSharemenu}
                  anchorEl={anchorEl}
                >
                  <MenuItem
                    onClick={(
                      e: React.MouseEvent<HTMLLIElement, MouseEvent>
                    ) => {
                      clickShareButton(e, title, id);
                    }}
                  >
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
      <style jsx>{`
        a {
          color: white;
          text-decoration: none;
        }
        .card {
          width: 100%;
          max-width: 680px;
          margin: auto;
          margin-bottom: 20px;
          padding: 0px 20px;
          box-sizing: border-box;
        }
        h1 {
          margin-top: 0px;
        }
      `}</style>
    </>
  );
};

export default PostCard;
