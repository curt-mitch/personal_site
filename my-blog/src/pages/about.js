import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

class About extends React.Component {
  render() {
    return (
      <Layout location={this.props.location} title="About Me">
        <SEO title="About Me" />
      <div>
          <p>
            I’m a software developer based in the San Francisco Bay Area.
            I’ve worked at a variety of analytics and machine learning startups
            and I enjoy making complex data and analyses more easily understood.
          </p>
      </div>
      <h4>Background</h4>
      <div>
        <p>
          I transitioned to software development after spending several years as a data analyst
          at an alternative energy and efficiency consultancy.
          I became a member of one of the first cohorts of the coding boot camp Hack Reactor in
          2013 and since then have worked at various startups, primarily as a front-end engineer.
          I obtained a bachelor of science degree in physics and a bachelor of arts degree in
          math along with minors in German and Japanese from the University of North Texas in 2008.
        </p>
        <p>
          My professional interests include implementing beautiful and functional UIs and data
          visualizations. More recently I’ve been working on courses and side projects in
          cryptography, machine learning (especially deep learning), and natural language
          processing. Outside of the worlds of software and analytics my hobbies include
          reading all categories of books, studying foreign languages, cooking, martial arts
          and general exercise, playing guitar, and engaging in the everlasting struggle to find
          a balance between the desire to enjoy delicious foods and drinks and the desire to
          be fit and healthy.
        </p>
      </div>
      <h4>Social Links</h4>
      <div>
        <a href="https://www.linkedin.com/in/curtislmitchell/">LinkedIn</a>
      </div>
      <div>
        <a href="https://github.com/curt-mitch">GitHub</a>
      </div>
      <div>
        <a href="https://twitter.com/curt_mitch">Twitter</a>
      </div>
      <br></br>
      </Layout>
    )
  }
}

export default About

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
