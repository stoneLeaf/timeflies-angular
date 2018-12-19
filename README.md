# timeflies-angular

![Work in progress](https://img.shields.io/badge/work-in%20progress-red.svg)

TimeFlies Angular front-end.

TimeFlies is a time tracking application designed as a personal learning project.

## Table of contents

- [Setup](#setup)
- [Development journal](#development-journal)
- [License](#license)

## Setup

This project requires [Node.js](https://nodejs.org/), [npm](https://www.npmjs.com/get-npm) and an instance of [TimeFlies backend API](https://github.com/stoneLeaf/timeflies-backend). With a global install of the [Angular CLI](https://cli.angular.io/), you can then follow these steps:

- clone the repository
- `npm install` to set up the required dependencies
- edit config to set the base URL of the backend API (local or remote)
- `ng serve` to run a dev server

## Development journal

In the same fashion as with my [coding journey](https://github.com/stoneLeaf/coding-journey) and the [back-end development](https://github.com/stoneLeaf/timeflies-backend), I will try to lay out my chain of thoughts and progress.

1. [Tour of Cats](#tour-of-cats)

### Tour of Cats

To get a first glance at the [Angular](https://angular.io/) framework, I started with the official [Tour of Heroes](https://angular.io/tutorial) tutorial, and made it about cats instead. I was finally going to see what all the fuss was about with component-based design. The component starter kit provided by the Angular CLI for each of them is a class, a template, a private stylesheet and a spec. The idea is that these components are reusable throughout the application and should as isolated as possible.

Something that struck me right away was the easy implementation of two-way data-binding. With a special syntax, `[()]`, also called *banana-box*, wrapped around the `ngModel` directive of `FormsModule`, the value of a text input syncs back instantly to the model. And it was also the first time I encountered [TypeScript](https://www.typescriptlang.org/). It brought back familiar notions such as instances and decorators, and mixed them with the ones I had newly encountered in JavaScript.

## License

This project is under the [MIT license](LICENSE).
