import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import ReactDOM from "react-dom";
import App from "../app"
import Layout from '../components/layout'
import * as serviceWorker from "../serviceWorker";
import { Auth0Provider } from "../react-auth0-spa";
import config from "../../auth_config/auth_config.json";
import history from "../Utils/history";



const onRedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
  <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();

const IndexPage = ({ data }) => (
  <Layout>
    <h1>Enjoy everyday like it's your last!</h1>

    <p>Need some Advice? <Link to="/contact"> Contact Me. </Link></p>
    <br />

    <ul>
      {data.allStrapiArticle.edges.map(document => (
        <li key={document.node.id}>
          <h2>
            <Link to={`/${document.node.id}`}>{document.node.title}</Link>
          </h2>
          <Img fixed={document.node.image.childImageSharp.fixed} />
          <p>{document.node.content}</p>
        </li>
      ))}
    </ul>

    <Link to="/page-2/">Go to page 2</Link>
    <br />

  </Layout>
)

export default IndexPage

export const pageQuery = graphql`  
  query IndexQuery {
    allStrapiArticle {
      edges {
        node {
          id
          image {
            childImageSharp {
              fixed(width: 200, height: 125) {
                ...GatsbyImageSharpFixed
              }
            }
          }
          title
          content
        }
      }
    }
  }
`


