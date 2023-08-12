# Developer Portfolio - [dnadas.com](https://dnadas.com)
# Features

### Project showroom 
- Through the integration of the [GitHub REST API](https://docs.github.com/en/rest?apiVersion=2022-11-28), my portfolio dynamically presents projects.
- Project metadata, like username and project names are stored in the database, managed by my backend API.
- Using these, my app is able to fetch the current version of project details and associated code snippets from GitHub.
- This ensures that visitors always view the most up-to-date content, reflecting the latest versions on my GitHub.

### Admin dashboard
- Secure access to my admin dashboard is ensured by [JWT Access-Refresh Token based authentication](https://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/) and [Role Based Access Control](https://auth0.com/docs/manage-users/access-control/rbac) on my backend API.
- Sensitive data like passwords are hashed using [BCrypt](https://www.npmjs.com/package/bcrypt).
- This dashboard allows me to manage the projects that are displayed on my Projects tab, allowing for seamless content updates.
- [Preview](https://github.com/DNadas98/project_showroom/tree/main/img)

### E-mail contact form
- I have implemented an email contact form using the [SendGrid API](https://sendgrid.com/) and [SendGrid npm package](https://www.npmjs.com/package/@sendgrid/mail) and e-mail forwarding from my domain.
- I forward the request to the backend API, add my private token, send the request via Axios, and send back a success / failure message based on the received response.
- Although this method is safe and working correctly, I am already working on a safe config for my own Postfix SMTP, that could be set up on my VPS instead of relying on the third-party API.

# Setup
- See [setup.md](https://github.com/DNadas98/project_showroom/blob/main/setup.md) for help with configuring, installing and running the project.


# Deployment
- The project is deployed on a VPS, for the production build I use [Docker Compose](https://docs.docker.com/compose/) for containerization and [Nginx as reverse proxy](https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/).
