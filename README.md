<img src="https://travis-ci.org/kk415kk/moocRP.svg?branch=master"/>
# moocRP: Reproducible Research Platform
Research platform for University of California, Berkeley researchers built by Kevin Kao in collaboration with Professor Zachary Pardos. To contribute to this project, please fork the project and make pull requests, or create Github issues.

Built on Node.js server with Sails.js framework for an MVC architecture. Python/Bash scripts and D3 visualizations mixed in.

Releases will be numbered as ````< major version >.< minor version >.< patch number >````

## Current Release
The current release version is:  ````0.1.3````
Last update: 12/23/15

## Author
Kevin Kao

## Table of Contents
* [Installation](documentation/installation.md)
* [Configuration](documentation/configuration.md)
* [Deployment](#deploying-to-production)
* [Visualization Instructions](documentation/visualizations.md)
* [Data Models](documentation/data_models.md)
* [edX Data Scrubbing](documentation/edX-datascrub.md)
* [Changelog](#changelog)
* [Features](#features)
* [Bugs](#bugs)
* [Roadmap](#roadmap)
* [License](#license)

## Deploying to Production
Configure the production settings in your ````config/local.js```` file. Ensure that the port and env settings are correct.

To run the application in production continuously, we use the ````pm2```` package (install it through ````sudo npm install pm2 -g````). Run this script to start the server:
````
./bin/run_moocRP.sh
````

To stop the server, run:
```
./bin/stop_moocRP.sh
```

## Changelog
````0.1.3```` - 10/18/2014: Patch to update start up and setup scripts. Fixed bug that deleted the wrong entries in requests/analytics tables. Added search/description features to analytics. Changed data type support to data model support. Fixed minor bugs with registration; removed launch from production minification to prevent bugs in UI.

````0.1.2```` - 09/08/2014: Patch for update on completion of moocRP analytics module specifications and import abilities. Dependency of Sails supported up to 0.10.5.

````0.1.1```` - 08/14/2014: Patch to add support for future additions of datascrub types. UI browser compatibility updates, refactored database models to be more efficient.

````0.1.0```` - 08/11/2014: First minor version release.

````0.0.3```` - 07/01/2014: First version with working request/download system, visualization upload system, user management UI.

````0.0.2a```` - 03/04/2014: Alpha version that replaced login system with Berkeley's CAS authentication.

````0.0.1a```` - 02/01/2014: Alpha version with working login/verification system.

## Features
* SSL integration
* Node.js CAS client (login system)
* Simple data distribution system (dataset request and download system)
* Generalized analytics/visualizations sharing platform
* Administration controls
* Sleek, responsive UI
* GPG encryption system for dataset downloads
* Support for multiple data models, from edX to Coursera, the HarvardX tools to raw data
* Multi-file support for multiple flat files per data model

## Bugs
* When deploying in production, moocRP must be deployed once first in development mode so that the database tables are created - find a way to automate this.

## Roadmap
- [P] Add "Reports" messaging system for managing bug handling/error messages
- [ ] Integrate JIRA ticketing system for open source release and collaboration
- [x] Add support for hooking datasets to the visualization upload system
- [ ] Strip out CAS client to package into npm package
- [x] Add profile updates for users
- [ ] Add support for sharing research papers
- [ ] Add support for running pre-processing scripts on datasets before visualizing (i.e. machine learning code)
- [x] Add multi-file support for each data model
- [P] Convert to using pub/sub and piping system for large datasets
- [ ] Investigate and implement automatic code review security
- [x] Begin populating Github wiki for instructions on use
- [ ] Perform penetration testing and security checks
- [ ] Scale/stress testing + test suites need to be developed
- [x] Add features to star/"bookmark" visualizations
- [ ] Implement alternative login system for non-CAS institutions

## License
MIT
