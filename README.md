

Voting Results
==============

this application is based on Docker's example [voting app](https://github.com/docker/example-voting-app). The app let you 


Architecture
-----

![Architecture diagram](readme/architecture.png)

* A Python webapp which lets you vote between two options
* A Redis queue which collects all the new votes
* A .Net worker which consumes votes and stores them in…
* A Postgres database backed by a Docker volume
* A Node.js webapp which shows the results of the voting in real time **(this repository)**

Getting started
---------------

1. Fork this repository. 
2. Add this repository to your Codefresh:
    * Select the forked repository (Superfresh/cf-example-result in our example) and press `NEXT`
    [screen](readme/screen-select-repo.png)
    * On the next step leave the setting on the default Dockerfile location
    * Press `CREATE`
    * On the last stage press `DONE` and not `BUILD`. We would like to configure the pipeline of the service.
    [screen](readme/screen-finish-add.png)

3. You can now configure your image:
    * Make sure you know your image name. You will use it later in the composition. In our example it's **superfresh/cfexampleresult**. you can change it to whatever you like as long as it in the format of <name_1>/<name_2> usually indicating repository owner name and repository name. 
    [screen](readme/screen-image-name.png)
    * Press Build. Select the current pipeline and the **master** branch.
    * When the build is finished you can press the **View Image** button and see the result. make sure that the image name is correct and the tag is **master**.
    [screen](readme/screen-image-final.png)
4. Now let's create the composition
    * Create a new composition and give it a name (**voting-app** in our example)
    * Press `edit` and enter this composition. The composition support docker compose syntax. make sure you user your own image name instead of `containers101/cfexampleresult:master`.
    
   ```
    version: '2'
    services:
      result:
        image: 'containers101/cfexampleresult:master'
        command: nodemon --debug server.js
        ports:
          - '80'
        links:
          - 'db:db'
      worker:
        image: 'containers101/cf-example-worker:master'
        links:
          - 'db:db'
          - 'redis:redis'
      redis:
        image: 'redis:alpine'
        ports:
          - '6379'
      vote:
        image: 'containers101/cf-example-vote:master'
        command: python app.py
        ports:
          - '80'
        links:
          - 'redis:redis'
      db:
        image: 'postgres:9.4'
```
    * Save the composition and then launch it by pressing the missile button.
    [screen](readme/screen-edit-compose.png)
    [screen](readme/screen-launch-log.png)
5. Check your composition:
    * go to the environment view and you can see that your composition is up.
    * press the `more info` link to see the containers.
    [screen](readme/screen-more-info.png)
    * You can open and see your app in the link for the voting app, and in the result app. 
    [screen](readme/screen-env.png)



