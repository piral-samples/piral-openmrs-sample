[![Piral Logo](https://github.com/smapiot/piral/raw/develop/docs/assets/logo.png)](https://piral.io)

# [Piral Sample](https://piral.io) &middot; [![GitHub License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/smapiot/piral/blob/main/LICENSE) [![Gitter Chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/piral-io/community)

> Piral OpenMRS Sample

:zap: This is a playground repository for demonstration purposes. It works against a publicly available instance of [OpenMRS](https://openmrs.org).

## Installation Instructions

To keep things simple this repository contains multiple folders that should / could be treated as individual repositories. Its **not** a monorepo, as all these folders come with their own *package.json* / infrastructure.

Go into the `app-shell` directory and install the dependencies:

```sh
cd app-shell
npm i
```

Now you are ready to start the app shell:

```sh
npm start
```

The app shell works against the default feed - you can replace or change this, of course.

## Scaffold a New Microfrontend

Easily scaffold a new microfrontend in directory (e.g., "esm-sample"):

```sh
npm init pilet --registry https://smapiot.pkgs.visualstudio.com/_packaging/piral/npm/registry/ --source @openmrs/app-shell -y
```

Since the above is a private feed, you'd potentially cannot do it. Instead, do the following.

If you'd like to call the microfrontend "esm-sample", then run in the root folder:

```sh
./scaffold.sh sample
```

This will create a new folder "esm-sample" with the microfrontend.

Start the new microfrontend from the directory:

```sh
npm start
```

To publish the microfrontend, run from the root:

```sh
./publish.sh sample
```

where *sample* is the name chosen for it.

## Reasons for this Sample

It shows how you can leverage Piral to efficiently establish communication patterns between microfrontends without impacting the whole application. Instead, Piral's loose coupling and app-shell distributed architecture allows every microfrontend to be isolated and individual where needed and open, as well as communicative when necessary.

This approach enables auto discovery, configurability, extensibility, and consistency.

## License

Licensed under MIT. For the code taken from the [OpenMRS](https://github.com/openmrs) repositories their individual licenses apply.
