# 🚀 Control Project

## 🧰 Tecnologies:

1. Vite
2. Gemini Api
3. Tailwind
4. Pdfjs-dist
5. React-router
6. Tessaract.js
7. Vercel CLI

===========================================================================

## 👀 A brief view:

### Home

In this component we have organized an aside component which has an menu that leads to a whole new page, at the right side.
On the pages directory, we have the home component, which has a direct connection with the sideMenu component that controls all of the sub pages under this main route.
On the SideMenu component we control the Aside component. This component is responsible for treat the name of the routes received from the routes handler and display it on the page containning the link to that pages.


### Forms

We have a diferent form for each change that is needed to be done, either include, delete or alter an item, each form must direct its info to a specific handler then it must call the fetchCall function wich will handle the intern apis call, and only then direct the data to the google api.

### Loading

On the load component we have a little animation of a whole alphabet in diferent font rolling down to the top, until it forms a word passed as parameter. This component is very depend of the Letter component.

### Intern API

We use the vercel CLI addressed to the real project (vercel deployment). It makes the project recognize some functions as an api, the configurations on the vite.config.js and vercel.json make possible for the project recognize and corretcly adress the api calls to a diferent port on the local and production enviroment.

### Utils

Here we have all the logic responsible for minor handler, reading and validation data. Every that is not a business rule.

===========================================================================

## ⚙️ Set up and executing the project

### Considering you already have installed the Node.js

On the terminal type:
1. git clone https://github.com/julio2116/Control.git
2. cd Control
3. code .

### Install the vercel CLI and link the project:
### Considering you have already deployed the project on Vercel
npm install -g vercel
vercel login

> Follow the instructions that will appear on the terminal

### Install the dependencies and configure the enviroment variables:
npm i
.env (it must contain a URl and GEMINI_API_KEY, variables. The URL leads to google sheets wich must handle the incoming data)

With everything set up and well configured type:
npm run dev (it will execute the front end on the default port 5173)
npm run server (This command will execute a new script created on the package.json --> "server": "vercel dev --listen 3001". this will make the intern back end listen to calls on the port 3001).

===========================================================================

## 🔄 Execution project logic:

For default both front and back end will run in diferrent ports, wich will not trigger any problems, unfurtunately also for default the front end will try to call for the API on the same port it runs, that will give us problems as the api do not listen anything on the default 5173 port.

## 🧠 Vercel.json, vite.config.js and APIS modules:

This configuration file, gives us the follow logic: the rewrites key, rewrites the routes that the vercel will handler, like: everything that contains the "/api/(*)" must be redirected to the "/api/$1" routes (back end), only if that rule do not aply (any other route that do not contain "/api"), it falls on the fall back rule: "redirect everything to the index.html", at this point the react router will handler every route.
When we try to leave the vercel alone decide what to do with the routes it will try to find an archive with the route name.

http://localhost            --> it will look for /dist/index.html (dist is the default directory after the build)
http://localhost/incluir    --> it will look for /dist/incluir.html (as it do not exists the browser will give us as 404 not found error)

Every single time we have the react router in the project it handle the routes created for us by its intern rules, evrything from the index.html, so we have to return this control for the react router, by turninning every single route that does not have the "/api" back to main .html archive.

In this project we have to kinds of routes at the same time, back and front.
By default vercel will serve only statics files and the js served along with index.html will visualy build the page, as it is a SPA, we only have one html archive, normally we would have have an diferent archive for each page, and when trying to accesss any url, the browser would look for the archive menchioned on the url, in this case if we want to have diferente Url's, we need to use the react router, that lib will render all of the information on the screen creating the ilusion we have diferente archives, it will intercept all the search for the diferent archive and redirect it to the index.html, while it will keep record of the state of that page and allow as to navigate between diferent "pages" (routes).

Flow:
1 --> if the end point has the "/api" it will be redirect to the archives on the "/api" path.
2 --> then vercel will redirect any other call to the index.html

> If the rule on the rewrites was not that restrictive it would follow to the third one

3 --> Vercel look for any archive when we try to acess an end point (the browser with url or any fetch function, for exemple).

This solve our problem on the production side, but we still have the same problem on the dev side. It is needed to separate the calls in front routes and back routes, differently from the case before, we need to solve this problem in other way, vite is not like other back end solutions, it was build in a way that it intercepts all route calls and redirect to the index.html, forcing the api calls that return json data to try renderize that ion the front end, what will crash the application.

We use the proxy to intercept any route to "/api", and instead of leaving the vite server try to handle it, redirect it to vercel local server (after have installed the vercel cli). The vercel cli will receive the requisition and analize the url for exemple:

http://localhost/api/apiGet --> Does any file exists in ./api/api.Get.js ?

As the function inside the archive is marked with the "export default" the vercel cli will execute the function received automatically, without using any express, or router handler as in any backend application.

We also have a gemini api call, the archive has a detailed structure that is passed to the model it is worth remembering that the model is used to interpret the raw text that comes from the proccess made for the processPDFs function on the readData module.
