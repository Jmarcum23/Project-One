# Handy Server #

A simple, quick to install, easy to run server for easily serving static files locally for testing, development and more.

## Installing Handy Server ##

Install Handy Server globally for best results.

```bash
npm install -g handy-server
```

## Running Handy Server ##

Go to the directory you want to serve statically and run the following command:

```bash
handy-server ./
```

Optionally, you can add a port number:

```bash
handy-server ./ 1337
```

Your directory will be available at `http://localhost:8080` or `http://localhost:<portNumber>`.

That's it!

## What it does ##

Handy Server does a few things for you, which could be handy.  Here's everything it does on purpose:

- Serves files locally on port 8080
- Automatically generates a directory listing for easy navigation through files
- Automatically converts markdown to HTML
- Wants you to worry less about spinning up a static file server locally
- Tries to be useful
- Hopes it makes you smile

## What it doesn't ##

Handy Server is a utility for local hosting and development tasks. This means it is not built to serve millions of users in real time or any other such madness.  Here's some other stuff it doesn't do:

- Encode everything with the correct HTTP header information
- Lock down, secure or otherwise provide any safety for publicly hosted websites
- Transmit binary files well
- GZip anything
- Go fast

## TL;DR ##

Handy Server is built for convenience and ease of use. Hopefully you find it helpful in doing small stuff locally.  There's a ton of stuff it doesn't do. Please be careful and don't make anything served with Handy Server available to the Wild Weird Web.
