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
2. [Minesweeper](#minesweeper)

### Tour of Cats

To get a first glance at the [Angular](https://angular.io/) framework, I started with the official [Tour of Heroes](https://angular.io/tutorial) tutorial, and made it about cats instead. I was finally going to see what all the fuss was about with component-based design. The component starter kit provided by the Angular CLI for each of them is a class, a template, a private stylesheet and a spec. The idea is that these components are reusable throughout the application and should as isolated as possible.

Something that struck me right away was the easy implementation of two-way data-binding. With a special syntax, `[()]`, also called *banana-box*, wrapped around the `ngModel` directive of `FormsModule`, the value of a text input syncs back instantly to the model. And it was also the first time I encountered [TypeScript](https://www.typescriptlang.org/). It brought back familiar notions such as instances and decorators, and mixed them with the ones I had newly encountered in JavaScript.

### [Minesweeper](https://github.com/stoneLeaf/minesweeper-angular)

For some reason, the notion of reusable components made me think of the tiles of a [Minesweeper](https://en.wikipedia.org/wiki/Minesweeper_(video_game)) game. Without further ado, I booted up a fresh Angular project with the [CLI](https://cli.angular.io/) and put my mind to it. After some work on a settings screen, I had a field with fixed dimensions from which I intended to dynamically generate a grid of tile components. The solution I came up with was using two `ngFor` directives which would iterate through both dimensions of the field array.

As anticipated, I also had to design the layout with CSS, or more specifically [Sass](https://sass-lang.com/) which adds a few handy features like variables and inheritance. I must admit I had some apprehension as it brought back distant memories of tedious work. This time I decided to use [Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox) which now has good browser support. With the help of a good [guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/), I built the layout with a lot more ease that I would have ever imagined and felt a bit reconciled with the matter.

Each tile component encapsulating a tile object, my goal was then to bind properties of the latter to CSS classes of the former. For instance, when a tile was flagged by the user, the `flagged` property of the object was set to `true` and the `.flagged` class had to be applied to the component. I achieved this by using the `ngClass` directive which adds classes depending on evaluated conditions. The result for the aforementioned example was `[ngClass]="{'flagged': tile.flagged}"`. This system turned out to work perfectly and I was quite impressed with the tidiness of this solution.

On a last note, I tried to find a use for [RxJS](https://rxjs-dev.firebaseapp.com/) as I wanted to get a glimpse of reactive programming. I ended up using `BehaviorSubject` observables to hold some values and made components react to changes emitted. In the end, I went a lot further than anticipated on this small intermediate [project](https://github.com/stoneLeaf/minesweeper-angular), and now feel a lot more prepared and eager for what's next.

## License

This project is under the [MIT license](LICENSE).
The social icons are from [Simple Icons](https://github.com/simple-icons/simple-icons) and under [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/).
All other graphics are by me and under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).