[Back to README](../README.md)

Installation
================

## Dependencies

**Ubuntu Instructions**

* Install ````git````: ````sudo apt-get install git````
* Install Node.js ~0.10.25, minimum 0.10.x:

    ````
    sudo apt-get install python-software-properties
    sudo apt-add-repository ppa:chris-lea/node.js
    sudo apt-get update
    sudo apt-get install nodejs-legacy
    ````

* Install npm (Node.js package manager) ~1.3.10:

    Use ````aptitude```` to install npm and downgrade Node.js through the prompt if conflicts occur.
    ````
    sudo apt-get install aptitude
    sudo aptitude install npm 
    ````

* Install MySQL server: ````sudo apt-get install mysql-server-5.6````
* Install Redis (latest installation instructions [here](http://redis.io/topics/quickstart)): 

    ```
    wget http://download.redis.io/redis-stable.tar.gz
    tar xvzf redis-stable.tar.gz
    cd redis-stable
    make
    make test
    sudo make install
    ```

* Install Sails.js ~0.10.5, minimum 0.10.x: ````sudo npm install -g sails````

## Setup Instructions
<b>Make sure MySQL and Redis are running before launching moocRP.</b>

First, create a new folder called moocRP_base to clone this repository to:
````
mkdir moocRP_base
cd moocRP_base
git clone http://github.com:kk415kk/moocRP.git
````

After cloning this repository, run the setup script to create the correct directory structure. Enter in the correct MySQL user and password when prompted. This will create the database as well.
````
./bin/setup/setup.sh
````

Once the setup script is run, the file structure setup should be in this format:
````
/moocRP_base
---- /moocRP (web application cloned from Github)
-------- /api
-------- /assets
------------ /scaffolds
------------ /analytics
-------- ...
-------- /logs
-------- /bin
------------ setup.sh [setup script to create directory structure]
---- /datasets
-------- /available
---------- /non_pii
---------- /pii
---------- /data_drop
-------- /extracted
-------- /encrypted
---- /analytics
-------- /tmp
-------- /archives
````

Then, we need to install all npm package dependencies before launch:
````
cd moocRP_base/moocRP
sudo npm install
````

There is also a bug where Grunt is not installed properly. To fix this:
````
cd moocRP_base/moocRP/node_modules/sails
sudo npm install grunt-cli
````

Configuration
================
See the [configuration documentation](configuration.md) to configure moocRP before launch. Most importantly, note that `local.js` must be created before launching.


Launching moocRP
================
To launch the application, first launch the Redis server:
````
redis-server&
````

Then, launch moocRP in a new command window:
````
cd moocRP_base/moocRP
sails lift
````

Note that if you configure moocRP to use SSL, you will need to run moocRP as admin:
````
sudo sails lift
````
