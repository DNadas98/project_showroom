import React from "react";
import "../style/aboutme.css";

function AboutMe() {
  return (
    <div className="AboutMe hcenter column">
      <div className="profile row">
        <img src="/static/img/profile.jpeg" alt="Profile" />
        <ul>
          <li>
            <h1>Hi, I'm Daniel Nadas</h1>
            <p>I’m currently working on:</p>
            <ul>
              <li>
                <a
                  className="blue underline"
                  href="https://github.com/DNadas98/project-notes"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  my full-stack MERN project with user authentication, authorization
                </a>
              </li>
              <li>
                <a
                  className="blue underline"
                  href="https://github.com/DNadas98/project_showroom"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  my Project Showroom App
                </a>
              </li>
              <li>
                <a
                  className="blue underline"
                  href="https://github.com/DNadas98/mern_template"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  my MERN Template Project
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ul>
        <li>
          <div className="codecool">
            <span>I’m currently studying full-stack software developement at</span>
            <a
              className="codecool blue underline"
              href="https://codecool.com/en/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/static/img/codecool.png" alt="codecool" />
              <h4>CodeCool</h4>
            </a>
            <span>coding bootcamp</span>
          </div>
        </li>
        <li>
          Contacts:{" "}
          <strong>
            <a
              className="blue underline"
              href="mailto:daniel.nadas.123@gmail.com"
              rel="noopener noreferrer"
            >
              daniel.nadas.123@gmail.com
            </a>
          </strong>
        </li>
      </ul>

      <h3>Tech Stack</h3>
      <div className="techStack row">
        <a
          className="blue underline"
          href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
          target="_blank"
          rel="noopener noreferrer"
          title="JavaScript"
        >
          <img src="/static/img/javascript.svg" alt="JavaScript" width="40" height="40" />
        </a>
        <a
          className="blue underline"
          href="https://nodejs.org"
          target="_blank"
          rel="noopener noreferrer"
          title="Node.js"
        >
          <img src="/static/img/node.png" alt="Node.js" width="40" height="40" />
        </a>
        <a
          className="blue underline"
          href="https://expressjs.com"
          target="_blank"
          rel="noopener noreferrer"
          title="Express.js"
        >
          <img src="/static/img/express.png" alt="Express.js" width="40" height="40" />
        </a>
        <a
          className="blue underline"
          href="https://www.mongodb.com/"
          target="_blank"
          rel="noopener noreferrer"
          title="MongoDB"
        >
          <img src="/static/img/mongo.svg" alt="MongoDB" width="40" height="40" />
        </a>
        <a
          className="blue underline"
          href="https://www.react.dev/"
          target="_blank"
          rel="noopener noreferrer"
          title="React"
        >
          <img src="/static/img/react.png" alt="React" width="40" height="40" />
        </a>
        <a
          className="blue underline"
          href="https://www.w3.org/html/"
          target="_blank"
          rel="noopener noreferrer"
          title="HTML 5"
        >
          <img src="/static/img/html5.png" alt="HTML 5" width="40" height="40" />
        </a>
        <a
          href="https://www.w3schools.com/css/"
          target="_blank"
          rel="noopener noreferrer"
          title="CSS 3"
        >
          <img src="/static/img/css3.png" alt="CSS 3" width="40" height="40" />
        </a>
        <a
          className="blue underline"
          href="https://www.linux.org/"
          target="_blank"
          rel="noopener noreferrer"
          title="Linux"
        >
          <img src="/static/img/linux.svg" alt="Linux" width="40" height="40" />
        </a>
        <a
          className="blue underline"
          href="https://git-scm.com/"
          target="_blank"
          rel="noopener noreferrer"
          title="GIT"
        >
          <img src="/static/img/git.svg" alt="GIT" width="40" height="40" />
        </a>
        <a
          className="blue underline"
          href="https://www.arduino.cc/"
          target="_blank"
          rel="noopener noreferrer"
          title="Arduino"
        >
          <img src="/static/img/arduino.svg" alt="Arduino" width="40" height="40" />
        </a>
      </div>
    </div>
  );
}

export default AboutMe;
