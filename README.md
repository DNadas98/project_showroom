# Project Showroom - [dnadas.com](https://dnadas.com)

My developer portfolio page, which utilizes my [GitHub REST API](https://docs.github.com/en/rest?apiVersion=2022-11-28) integration I have developed to present my projects dynamically through a full-stack web application.  
My application stores project data such as the username, project name and data for the code snippets of the projects in the database. The details of the projects and the source code for the snippets are fetched dynamically from the GitHub API based on the stored data. This ensures that the displayed information is always up-to-date and allows for simple management of the projects on the administrator page.  
For deployment, an option is to use [Nginx as reverse proxy](https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/) and [Docker Compose](https://docs.docker.com/compose/) for containerization.

# Preview of the admin dashboard
### Login page

![login](https://github.com/DNadas98/project_showroom/blob/main/img/login.jpg)
- (only accepts my admin account, which is not this example account)
### Overview of the projects
![admin 1](https://github.com/DNadas98/project_showroom/blob/main/img/admin01.jpg)
### Overview of the project files
![admin 2](https://github.com/DNadas98/project_showroom/blob/main/img/admin02.jpg)
### Project file editor form
![admin 3](https://github.com/DNadas98/project_showroom/blob/main/img/admin03.jpg)
### Account settings
![admin 4](https://github.com/DNadas98/project_showroom/blob/main/img/admin04.jpg)

# Configure, Install and Run

### Backend access, refresh token secret:

- terminal, node:
  ```js
  require("crypto").randomBytes(64).toString("hex");
  ```
- paste: `/env/backend.env.dev` (rename the txt)

### SSL localhost key & cert

- Windows:
  - [download openSSL for windows](https://slproweb.com/products/Win32OpenSSL.html)
  - Add system ENV: System/new: `openssl-install-path/bin`
- Linux:
  - Should be already installed, check: `openssl version -a`
  - If not: `sudo apt install openssl`
- Generate key:

```bash
  openssl version
  cd project-folder-path/ssl
  openssl genrsa -out localhost.key 2048 # 2048-bit RSA private key
  openssl req -new -key localhost.key -out localhost.csr # Certificate Signing Request, "Common Name": localhost
  openssl x509 -req -days 365 -in localhost.csr -signkey localhost.key -out localhost.crt # SSL certificate
```

- Add to `/ssl` folder

### Github API token

- [guide](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic)
- Add to `env/frontend.env.dev` (rename the txt): `OPEN_API_TOKEN`

### Configure MongoDB single node replica set

- Find `mongod.conf` of your local mongoDB server
- Uncomment / paste:

```bash
replication:
  replSetName: rs0
```

- Restart mongod process
- mongosh:

```bash
rs.initiate( {
   _id : "rs0",
   members: [
      { _id: 0, host: "localhost:27017" }
   ]
})
```

- Now the backend server can connect

### Register account from http client

```bash
POST https://localhost:5000/api_priv/users/
Content-Type: application/json
{ "username": "AppAdmin", "password": "password" }
```

### Give admin access in mongo

- Compass: projectshowroom/users/user

```js
"roles": [
    "User",
    "Editor", //add
    "Admin"   //add
  ],
```

- mongosh:

```bash
use projectshowroom;
db.users.find();
db.users.updateOne({username:"DevAdmin"},{$set:{roles: ["User","Editor","Admin"]}});
db.users.find();
```

### Populate DB with initial data

```bash
cd backend/model/populate
npm run populate
```

### Configure React app

- rename `frontend/client/_env.txt` to `.env`

### Install & Run

- backend

```bash
cd backend/server
npm i
npm run dev
```

- frontend

```bash
cd frontend/server
npm i
npm run dev
cd frontend/client
npm i
npm start #linux
npm run start_win #windows
# Optional: serve the build
npm run build
# Copy the built files and static folder to frontend/server/view
# The frontend serves the view/index.html and the view/static folder
```
