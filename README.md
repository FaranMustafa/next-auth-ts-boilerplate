# Nextjs Auth boilerplate

This is a Next.js project.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them:

- Node.js and npm: You can download Node.js from [here](https://nodejs.org/en/download/). npm is included with Node.js.

### Installing

A step by step series of examples that tell you how to get a development environment running:

1. Clone the repository: `git clone <repository-url>`.
2. Navigate into the project directory: `cd <project-name>`.
3. Install the dependencies: `npm install`.

## Running the Application

To start the development server, run the following command:

```bash
npm run dev
```

setup the environment

- create a file .env

and copy the following code

```bash
# next auth secret created by open ssl
NEXTAUTH_SECRET=NZd66RLeMFjyN1irMvgWg3/ouOivSuvOVevc06S9aJ8=

#local
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_API_URL="https://dummyjson.com"

# deveploment
NEXTAUTH_DEBUG=true
```

you can create your Next auth secret by openssl reference (link: https://next-auth.js.org/configuration/options#nextauth_secret)

after all this just run

```bash
npm install
```

and after all the dependencies are run

```bash
npm run dev
```
