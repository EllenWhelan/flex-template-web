# CS2013-CS3013 Software Engineering Project 
## Overview
This repository contains work completed for the Software Engineering project in Trinity College Dublin. The work was completed by a team of 6: 3 Third year students and 3 second year students in the School of Computer science and statistics. 
The project focused on developing extra features for oogo, a childcare marketplace platform. This repository is one of 2 utilised by the team during the course of this project. This repository was forked from the oogo repository which is itself forked from the sharetribe flex repository, as oogo is based on sharetribe flexes software for marketplace platforms. 

our project focused on additional features not included in sharetribe flex's framework, essentially further customising sharetribe for oogo. This repository includes the 'favourite feature'. This feature allowed users to 'favourite' minders by clicking a button on the minders profile page. The users 'favourites' were saved to the users profile and they can access them to search by their favourites. 



## Sharetribe Flex Template for Web

[![CircleCI](https://circleci.com/gh/sharetribe/ftw-daily.svg?style=svg)](https://circleci.com/gh/sharetribe/ftw-daily)

This is a template web application for a Sharetribe Flex marketplace ready to be extended and
customized. It is based on an application bootstrapped with
[create-react-app](https://github.com/facebookincubator/create-react-app) with some additions,
namely server side rendering and a custom CSS setup.

> Note: We also have [FTW-hourly](https://github.com/sharetribe/ftw-hourly) for time-based
> processes. If you are taking time-based booking process into use, you should consider using it
> instead. You can read more from the related
> [Flex Docs article](https://www.sharetribe.com/docs/background/time-based-template)

###  Quick start

If you just want to get the app running quickly to test it out, first install
[Node.js](https://nodejs.org/) and [Yarn](https://yarnpkg.com/), and follow along:

```sh
git clone git@github.com:sharetribe/ftw-daily.git      # clone this repository
cd ftw-daily/                                          # change to the cloned directory
yarn install                                                   # install dependencies
yarn run config                                                # add the mandatory env vars to your local config
yarn run dev                                                   # start the dev server, this will open a browser in localhost:3000
```

You can also follow along the
[Getting started with FTW](https://www.sharetribe.com/docs/tutorials/getting-started-with-ftw/)
tutorial in the [Flex Docs website](https://www.sharetribe.com/docs/).

For more information of the configuration, see the
[FTW Environment configuration variables](https://www.sharetribe.com/docs/references/ftw-env/)
reference in Flex Docs.

**Note:** If you want to build your own Flex marketplace on top of the template, you should fork the
repository instead of cloning it. See the
[How to Customize FTW](https://www.sharetribe.com/docs/guides/how-to-customize-ftw/) guide in Flex
Docs.

### Getting started with your own customization

If you want to build your own Flex marketplace by customizing the template application, see the
[How to Customize FTW](https://www.sharetribe.com/docs/guides/how-to-customize-ftw/) guide in Flex
Docs.

### Deploying to Heroku

**Note:** Remember to fork the repository before deploying the application. Connecting your own
Github repository to Heroku will make manual deploys easier.

See the
[How to deploy FTW to production](https://www.sharetribe.com/docs/guides/how-to-deploy-ftw-to-production/)
guide in Flex Docs for more information.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

### Documentation

See the Flex Docs site: https://www.sharetribe.com/docs/

See also the [docs/](docs/) directory for some additional internal documentation.

### Get help – join Sharetribe Flex Developer Slack channel

If you have any questions about development, the best place to ask them is the Flex Developer Slack
channel at https://www.sharetribe.com/flex-slack

### License

This project is licensed under the terms of the Apache-2.0 license.

See [LICENSE](LICENSE)


