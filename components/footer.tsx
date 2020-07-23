import Typography from "@material-ui/core/Typography";
import TwitterIcon from "@material-ui/icons/Twitter";

export default () => {
  return (
    <>
      <div className="footer">
        <Typography variant="body1" style={{ color:'white' }}>
          This site uses Google Analytics.
        </Typography>
        <a className="twitterLink" target="_blank" rel="noopener" href="https://twitter.com/damarai0422">
          <TwitterIcon />
        </a>
      </div>
      <style jsx>{`
        .footer {
          background-color: #00a4ac;
          text-align: center;
        }
        .twitterLink{
            color:black;
        }
        .twitterLink:hover{
            cursor:pointer;
            color: blue;
        }
        .twitterLink:active{
            color:red;
        }
      `}</style>
    </>
  );
};
