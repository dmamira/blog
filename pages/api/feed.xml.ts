import axios from "axios";
import * as xmljs from "xml-js";

const RssFeedXml = () => null;

export default async (req, res) => {
  const config = {
    headers: { "X-API-KEY": process.env.APIKEY },
  };
  const origin = "https://blog.dai.gd";
  const blogData = await axios.get(
    `https://dai.microcms.io/api/v1/posts`,
    config
  );
  const blogs = await blogData.data.contents;
  const xml = xmljs.js2xml(
    {
      _declaration: {
        _attributes: {
          version: "1.0",
          encoding: "utf-8",
        },
      },
      feed: {
        _attributes: {
          xmlns: "http://www.w3.org/2005/Atom",
        },
        id: {
          _text: origin + "/",
        },
        title: {
          _text: `Dai's Tech Blog`,
        },
        updated: {
          _text: blogs[0].updatedAt,
        },
        link: {
          _attributes: {
            rel: "self",
            href: origin + "/feed.xml",
          },
        },
        entry: blogs.map((blogPost) => ({
          id: {
            _text: origin + "/posts/" + blogPost.id,
          },
          title: {
            _text: blogPost.title,
          },
          updated: {
            _text: blogPost.updatedAt,
          },
          summary: {
            _text: blogPost.description,
          },
        })),
      },
    },
    { compact: true }
  );

  res!.setHeader("content-type", "application/xml");
  res!.write(xml);
  res!.end();

  return;
};
