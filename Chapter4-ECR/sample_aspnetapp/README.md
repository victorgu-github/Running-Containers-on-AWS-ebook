# ASP.NET Core Docker Sample

This sample demonstrates how to build container images for ASP.NET Core web apps. You can use these samples for Linux and Windows containers, for x64, ARM32 and ARM64 architectures.

The sample builds an application in a [.NET SDK container](https://hub.docker.com/_/microsoft-dotnet-sdk/) and then copies the build result into a new image. You can test the built image locally or deploy it to a container registry.

The instructions assume that you have cloned this repo, have [Docker](https://www.docker.com/products/docker) installed, and have a command prompt open within the `samples/aspnetapp` directory within the repo.

# for dotnet core docker, we can use ubi8/dotnet-50-runtime for net 5
ubi8/dotnet-30-runtime for dotnet core 3



## Build an ASP.NET Core image

You can build and run a .NET-based container image using the following instructions:

```console
docker build --pull -t aspnetapp .
docker run --rm -it -p 8000:8080 aspnetapp
```

You should see the following console output as the application starts:

```console
> docker run --rm -it -p 8000:8080 aspnetapp
Hosting environment: Production
Content root path: /app
Now listening on: http://[::]:8080
Application started. Press Ctrl+C to shut down.
```

After the application starts, navigate to `http://localhost:8000` in your web browser.

> Note: The `-p` argument maps port 8000 on your local machine to port 8080 in the container (the form of the port mapping is `host:container`). See the [Docker run reference](https://docs.docker.com/engine/reference/commandline/run/) for more information on command-line parameters. In some cases, you might see an error because the host port you select is already in use. Choose a different port in that case.


In production, you will typically start your container with `docker run -d`. This argument starts the container as a service, without any console interaction. You then interact with it through other Docker commands or APIs exposed by the containerized application.

We recommend that you do not use `--rm` in production. It cleans up container resources, preventing you from collecting logs that may have been captured in a container that has either stopped or crashed.

