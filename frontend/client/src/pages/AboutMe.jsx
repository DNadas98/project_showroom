import React from "react";
import { Link } from "react-router-dom";
import "../style/aboutme.css";

function AboutMe() {
  return (
    <div className="AboutMe hcenter column">
      <div className="profile row">
        <img src="/static/img/profile.jpeg" alt="Profile" loading="lazy" />
        <ul>
          <li>
            <h1>Hello, my name is Daniel Nadas.</h1>
            <h3>I'm an aspiring full-stack software developer.</h3>
            <p>I’m currently working on:</p>
            <ul>
              <li>
                <a
                  className="blue underline"
                  href="https://github.com/DNadas98/project_showroom"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  My Project Showroom full-stack MERN application
                </a>
              </li>
              <li>
                <span>
                  Learning{" "}
                  <a
                    className="blue underline"
                    href="https://en.wikipedia.org/wiki/Object-oriented_programming"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Object Oriented Programming
                  </a>{" "}
                  with{" "}
                  <a
                    className="blue underline"
                    href="https://dev.java/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Java
                  </a>
                </span>
              </li>
              <li>
                <span>
                  Learning{" "}
                  <a
                    className="blue underline"
                    href="https://getbootstrap.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Bootstrap CSS framework
                  </a>{" "}
                  to improve my designs
                </span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="column">
        <div className="codecool">
          <span>I’m currently studying full-stack software development at</span>
          <a
            className="codecool blue underline"
            href="https://codecool.com/en/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/static/img/codecool.png" alt="codecool" loading="lazy" />
            <h4>CodeCool</h4>
          </a>
          <span>coding bootcamp</span>
        </div>
        <strong>
          <Link to="/showroom" className="blue underline">
            Explore my projects!
          </Link>
        </strong>
        <strong>
          <Link to="/contacts" className="blue underline">
            View my contacts and start a conversation!
          </Link>
        </strong>
      </div>
      <div className="column">
        <h3>Tech Stack</h3>
        <div className="techStack row">
          <a
            className="blue underline"
            href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
            target="_blank"
            rel="noopener noreferrer"
            title="JavaScript"
          >
            <img
              src="/static/img/javascript.svg"
              alt="JavaScript"
              width="40"
              height="40"
              loading="lazy"
            />
          </a>
          <a
            className="blue underline"
            href="https://nodejs.org"
            target="_blank"
            rel="noopener noreferrer"
            title="Node.js"
          >
            <img
              src="/static/img/node.png"
              alt="Node.js"
              width="40"
              height="40"
              loading="lazy"
            />
          </a>
          <a
            className="blue underline"
            href="https://expressjs.com"
            target="_blank"
            rel="noopener noreferrer"
            title="Express.js"
          >
            <img
              src="/static/img/express.png"
              alt="Express.js"
              width="40"
              height="40"
              loading="lazy"
            />
          </a>
          <a
            className="blue underline"
            href="https://www.mongodb.com/"
            target="_blank"
            rel="noopener noreferrer"
            title="MongoDB"
          >
            <img
              src="/static/img/mongo.svg"
              alt="MongoDB"
              width="40"
              height="40"
              loading="lazy"
            />
          </a>
          <a
            className="blue underline"
            href="https://www.react.dev/"
            target="_blank"
            rel="noopener noreferrer"
            title="React"
          >
            <img
              src="/static/img/react.png"
              alt="React"
              width="40"
              height="40"
              loading="lazy"
            />
          </a>
          <a
            className="blue underline"
            href="https://www.w3.org/html/"
            target="_blank"
            rel="noopener noreferrer"
            title="HTML 5"
          >
            <img
              src="/static/img/html5.png"
              alt="HTML 5"
              width="40"
              height="40"
              loading="lazy"
            />
          </a>
          <a
            href="https://www.w3schools.com/css/"
            target="_blank"
            rel="noopener noreferrer"
            title="CSS 3"
          >
            <img
              src="/static/img/css3.png"
              alt="CSS 3"
              width="40"
              height="40"
              loading="lazy"
            />
          </a>
          <a
            className="blue underline"
            href="https://www.linux.org/"
            target="_blank"
            rel="noopener noreferrer"
            title="Linux"
          >
            <img
              src="/static/img/linux.svg"
              alt="Linux"
              width="40"
              height="40"
              loading="lazy"
            />
          </a>
          <a
            className="blue underline"
            href="https://git-scm.com/"
            target="_blank"
            rel="noopener noreferrer"
            title="GIT"
          >
            <img
              src="/static/img/git.svg"
              alt="GIT"
              width="40"
              height="40"
              loading="lazy"
            />
          </a>
          <a
            className="blue underline"
            href="https://www.arduino.cc/"
            target="_blank"
            rel="noopener noreferrer"
            title="Arduino"
          >
            <img
              src="/static/img/arduino.svg"
              alt="Arduino"
              width="40"
              height="40"
              loading="lazy"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
