<div id="top"></div>

[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/akin-fagbohun/everything-news-frontend">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Everything News - Frontend</h3>

  <p align="center">
    Everything News is a frontend and backend two-part project where I build a backend database with PostgreSQL, Express.js and Node. This repo is the frontend side of the two-part project, built with React. The backend repository for this project can be found here [https://github.com/akin-fagbohun/everything-news-backend]. 
    <br />
    <a href="https://github.com/akin-fagbohun/everything-news-frontend"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/akin-fagbohun/everything-news-frontend">View Demo</a>
    ·
    <a href="https://github.com/akin-fagbohun/everything-news-frontend/issues">Report Bug</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

### Built With

- [React.js](https://reactjs.org/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To see this project, please visit my portfolio website where you should be able to access 'Everything News - Frontend'.

In the event that you cannot access my website and/or the 'Everything News - Frontend' project, you are able to create a local version of repository. Note that you may also need to fork and deploy a local version of the backend repo in order to render the UI in full.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```bash
   git clone https://github.com/akin-fagbohun/everything-news-frontend.git
   ```
2. Install NPM packages
   ```bash
   npm install
   ```
3. Check that you can access my backend API, currently hosted on Heroku. If online, you should be able to demo the project.
   ```bash
   npm run start
   ```
4. If offline, clone and deploy backend API, instructions for which can be found within the README for its repository.
   ```bash
   git clone https://github.com/akin-fagbohun/everything-news-backend.git
   ```
5. Modify the base API URL on line 4 of /utils/api.js to contain your newly deployed API
   ```js
   const newsApi = axios.create({
     baseURL: '<http://your-new-api>/api>', // change this line
   });
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- Adding footer with contact information and other project links.
- Comment upvoting and downvoting.
- Posting new articles.
- Integration with personal portfolio to add blog functionality.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Project Link: [https://github.com/akin-fagbohun/everything-news-frontend](https://github.com/akin-fagbohun/everything-news-frontend)

<p align="right">(<a href="#top">back to top</a>)</p>

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[issues-shield]: https://img.shields.io/github/issues/akin-fagbohun/everything-news-frontend.svg?style=for-the-badge
[issues-url]: https://github.com/akin-fagbohun/everything-news-frontend/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/akinfagohun
