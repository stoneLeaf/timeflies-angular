# timeflies-angular

![Work in progress](https://img.shields.io/badge/work-in%20progress-red.svg) [![Build Status](https://travis-ci.com/stoneLeaf/timeflies-angular.svg?branch=master)](https://travis-ci.com/stoneLeaf/timeflies-angular)

Timeflies is a time-tracking [SaaS](https://en.wikipedia.org/wiki/Software_as_a_service) built upon a full JavaScript stack. This repository contains an Angular front-end client meant to work with [Timeflies's Node.js back-end](https://github.com/stoneLeaf/timeflies-backend).

[**Live demo on GitHub Pages**](https://stoneleaf.github.io/timeflies-angular/)

> Please note that the demo's back-end is hosted on a free Heroku dyno. Therefore, a few seconds are necessary before it fully wakes up and handles the first request.

## Table of contents

- [Setup](#setup)
- [Development journal](#development-journal)
- [License](#license)

## Setup

This project requires [Node.js](https://nodejs.org/), [npm](https://www.npmjs.com/get-npm) and an instance of [Timeflies backend API](https://github.com/stoneLeaf/timeflies-backend). With a global install of the [Angular CLI](https://cli.angular.io/), you can then follow these steps:

- clone the repository
- `npm install` to set up the required dependencies
- edit `src/environments/environment.ts` to set the base URL of the backend API (local or remote)
- `ng serve` to run a dev server

## Development journal

In the same fashion as with my [coding journey](https://github.com/stoneLeaf/coding-journey) and the [back-end development](https://github.com/stoneLeaf/timeflies-backend), I will try to lay out my chain of thoughts and progress.

1. [Tour of Cats](#tour-of-cats)
2. [Minesweeper](#minesweeper)
3. [Reporting for duty](#reporting-for-duty)
4. [Router entanglement](#router-entanglement)
5. [First request](#first-request)
6. [Authentication](#authentication)
7. [The matcher trick](#the-matcher-trick)
8. [Fixing redirect from guard](#fixing-redirect-from-guard)
9. [Taking shape](#taking-shape)

### Tour of Cats

To get a first glance at the [Angular](https://angular.io/) framework, I started with the official [Tour of Heroes](https://angular.io/tutorial) tutorial, and made it about cats instead. I was finally going to see what all the fuss was about with component-based design. The component starter kit provided by the Angular CLI for each of them is a class, a template, a private stylesheet and a spec. The idea is that these components are reusable throughout the application and should be as isolated as possible.

Something that struck me right away was the easy implementation of two-way data-binding. With a special syntax, `[()]`, also called *banana-box*, wrapped around the `ngModel` directive of `FormsModule`, the value of a text input syncs back instantly to the model. And it was also the first time I encountered [TypeScript](https://www.typescriptlang.org/). It brought back familiar notions such as instances and decorators, and mixed them with the ones I had newly encountered in JavaScript.

### [Minesweeper](https://github.com/stoneLeaf/minesweeper-angular)

For some reason, the notion of reusable components made me think of the tiles of a [Minesweeper](https://en.wikipedia.org/wiki/Minesweeper_(video_game)) game. Without further ado, I booted up a fresh Angular project with the [CLI](https://cli.angular.io/) and put my mind to it. After some work on a settings screen, I had a field with fixed dimensions from which I intended to dynamically generate a grid of tile components. The solution I came up with was using two `ngFor` directives which would iterate through both dimensions of the field array.

As anticipated, I also had to design the layout with CSS, or more specifically [Sass](https://sass-lang.com/) which adds a few handy features like mixins and inheritance. I must admit I had some apprehension as it brought back distant memories of tedious work. This time I decided to use [Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox) which now has good browser support. With the help of a good [guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/), I built the layout with a lot more ease that I would have ever imagined and felt a bit reconciled with the matter.

Each tile component encapsulating a tile object, my goal was then to bind properties of the latter to CSS classes of the former. For instance, when a tile was flagged by the user, the `flagged` property of the object was set to `true` and the `.flagged` class had to be applied to the component. I achieved this by using the `ngClass` directive which adds classes depending on evaluated conditions. The result for the aforementioned example was `[ngClass]="{'flagged': tile.flagged}"`. This system turned out to work perfectly and I was quite impressed with the tidiness of this solution.

On a last note, I tried to find a use for [RxJS](https://rxjs-dev.firebaseapp.com/) as I wanted to get a glimpse of reactive programming. I ended up using `BehaviorSubject` observables to hold some values and made components react to changes emitted. In the end, I went a lot further than anticipated on this small intermediate [project](https://github.com/stoneLeaf/minesweeper-angular), and now feel a lot more prepared and eager for what's next.

### Reporting for duty

The first order of business was to design a draft of the logo. I felt like I needed that and a color scheme before anything else to help me get mental pictures of the layout. While I am not illustrator, I still managed to make something workable. As intended all along, I used a play on the word *flies* to get a basis for the logo.

Regarding the general layout, which I had already sketched on plain old paper, I planned to have a full width navigation bar at the top, a content section with fixed width and a minimalist footer. While I intended to make it responsive and more elaborate at some point, the primary focus was to produce a basic and workable layout.

### Router entanglement

Faithful to my long habit of adding complexity at early stages, I decided it was imperative that the layout for what I called the *lobby* area was different from the one for the logged in user interface. While I knew it would require some more advanced structural work, I figured it would simply translate in creating several [sub modules](https://angular.io/guide/module-types) with dedicated [companion routers](https://angular.io/api/router/RouterModule). The implementation, *of course*, turned out to be a lot more time consuming that I had anticipated.

In the end it took me a few hours of frustration and failed attempts to achieve the end goal. I could not get my head around nested [router outlets](https://angular.io/api/router/RouterOutlet). It felt logic to have a global router outlet in my root component routed to a component from a sub module, which would contain another router outlet filled in turn by a sub router. In the end the solution was the `children` property of `Route`, of which I was aware from the beginning but that I had prematurely discarded due to a misconception. Thankfully, I had gained a better understanding of Angular routing in the process and was finally satisfied with the result.

A significant benefit of that structure is that it allows [lazy loading](https://angular.io/guide/lazy-loading-ngmodules). Basically, modules can be loaded on a as-needed basis. For instance, a visitor could be able to swiftly load the lobby area without fetching right away the *supposed* heavy application interface. That feat was accomplished at the root router level, with the `loadChildren` property. At that stage it was obviously a bit early but I was glad I had encountered such an important feature.

### First request

I decided that the first step of the application implementation had to be the user signup. To this end, I needed, at the very least, a working form and a service making the HTTP requests to the backend. I had [already](#tour-of-cats) stumbled upon the [ngModel](https://angular.io/api/forms/NgModel) directive and planned to use it. I ended up creating an empty user model at component creation, binding its properties to the form inputs and POSTing the result on submission. Of course, the first request I made didn't work as my backend was not allowing [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing). After a [quick commit](https://github.com/stoneLeaf/timeflies-backend/commit/7b29741ca808207a3dc3be256a32c8e03b851b04), I finally had the first successful request to the API.

The back-end running locally, the requests were too fast to let me see style changes such as button deactivation on submission. I decided to add an [HttpInterceptor](https://angular.io/api/common/http/HttpInterceptor) which would delay all requests in order to simulate network latency. But I just couldn't make it work at first. I was adding it to the AppModule providers array on the condition that `environment.production` was `false`. And it turned out to be `true`, while [isDevMode()](https://angular.io/api/core/isDevMode) was also `true`, and I couldn't get my head around it. In the end, I found out that I had misused the auto-import feature of VS Code and imported `environment.prod` instead of `environment`, a difference which was quite hard to spot at the end of the import line. Ironically, I ended up discarding the idea of an interceptor made for that purpose and used the more suited [network throttling capability of the Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/network-performance/reference#throttling).

Many questions arose as I started to write the code handling the API responses. Some of them about [error handling](https://angular.io/guide/http#error-handling). It was obvious to me that it had to be done at the service level and never in the components. For that purpose, I created a specific handler for HTTP errors which was piped in with [catchError](https://rxjs-dev.firebaseapp.com/api/operators/catchError). One of the ideas was to create a `ValidationError` that would be passed to the components in case of a [422 status](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/422) and be processed to give feedback to the user. I thought about network issues too and planned to create a toast notification service later on to display short messages.

Immediately after, the HTTP error handling had to be switched from a *misused* service to an [HttpInterceptor](https://angular.io/api/common/http/HttpInterceptor). In case the server response was 401 (unauthorized), I wanted the router to navigate to the login page. For that purpose, I simply added the `Router` to the constructor to have it injected, but its reference remained `undefined`. Then I remembered that I wasn't *directly* calling the error handler's singleton instance method but instead passing it as a function object to the `catchError` operator. With the interceptor, I was finally able to make the router call I needed and as a bonus my services became [drier](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself).

### Authentication

Having implemented a [JWT](https://en.wikipedia.org/wiki/JSON_Web_Token) authentication scheme on the back-end, I needed to write the client-side part. To that purpose, the first step was getting the token from the login request and storing it in [local storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage). The token payload containing the user profile, it had to be extracted, stored in the authentication service and made available. In case of a browser refresh, or any application reloading, the token would be read again and if not expired, the profile extracted. That process was triggered by a [route guard](https://angular.io/guide/router#milestone-5-route-guards) mediating navigation to all routes requiring a logged in user.

In addition, the token had to be sent along every back-end API requests. Came to the rescue another [HttpInterceptor](https://angular.io/api/common/http/HttpInterceptor) which would add the authentication header on the fly to all requests. I was aware that [angular2-jwt](https://github.com/auth0/angular2-jwt), a package I was already using for token decoding, came with a fully-featured interceptor. But I thought I would make my own as I wanted to comprehend all authentication aspects of the application. Of course I added a simple filter to prevent token leaks to other domains than the back-end's.

One feature I chose to implement was a very basic user role system. For a single guard to suffice, I just fed it arguments using the [data option](https://angular.io/api/router/Route#data) of `Route`, in specific an array of `Role`, a custom [enum](https://www.typescriptlang.org/docs/handbook/enums.html). For instance, the dashboard area required a logged in user and therefore `Role.User` was passed to the guard. On the other hand, the lobby area was only to be accessible to unregistered users and `Role.Unregistered` was passed. For a route to be accessible to several user roles, they just had to be passed in an array. Those rules were probably going to change later but it was interesting to put in place some basic logic and experiment.

### The matcher trick

Early in the application design, I had in mind a structure in which a different module would be [lazy loaded](https://angular.io/guide/lazy-loading-ngmodules) depending on wether the user was logged in or not. Furthermore, I didn't want to have the user interface available under a global sub-path. For instance, I pictured that the root path of the application for a logged in user would be the dashboard from the user interface module, and for the unregistered visitor, the introduction page from the lobby module. I thought of it as a pretty common architecture and chose to implement it later as I was not yet comfortable enough with the router.

Then came the time to implement and things were unexpectedly trickier. The first obvious thing I tried was using a [guard](https://angular.io/guide/router#milestone-5-route-guards). But what I had not realized at first is that when a guard returns `false`, as in this route should not be activated, the navigation is definitively canceled. It's up to the guard to trigger some actions such as a router navigation to a fallback path. And what I needed instead is the router to look for another match in the `Routes` array, specifically to another module.

After looking at [all the properties](https://angular.io/api/router/Routes) available for a `Route`, I came up with an idea. The `matcher` option took a function that could be set up as a custom path matching strategy. In my case, even though I didn't care much for the path itself, I thought I could maybe divert it from its original purpose and check instead if the user was logged in or not. The issue which came first when implementing was that they were only functions and as such did not have access to Angular's [dependency injection](https://angular.io/guide/dependency-injection), thus preventing any calls to the authentication service. I wondered what things of interest could be accessed from this scope and then it hit me, [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage). I just had to check whether the `token` property was set or not.

To my great satisfaction, this solution turned out to work well and exactly as intended. After some more research I found out that another developer had come out with a [similar solution](https://medium.com/@lenseg1/loading-different-angular-modules-or-components-on-routes-with-same-path-2bb9ba4b6566). Moreover, he found a way to access the [DI](https://angular.io/guide/dependency-injection) from the matcher functions. But I liked the simplicity of my implementation and did not think it was at all necessary in my case to risk playing with Angular's internals.

### Fixing redirect from guard

With the 7.1 Angular update came a [new feature](https://github.com/angular/angular/commit/4e9f2e5) for guards. Instead of handling manually redirections and then returning `false`, it became possible for them to return a [UrlTree](https://angular.io/api/router/UrlTree) to be directly processed by the router as a redirection. The goal was to let the former properly handle priority in case multiple guards were trying to redirect at the same time. But as I was implementing this feature, something did not work as expected and it led to a few hours spent debugging Angular's router.

To be specific, in case the returned `UrlTree` was the root url `/` and it was the first navigation request (as in the application is started on the guarded path), it would not redirect at all after the `NavigationCancel` event. The culprit was `router.navigated`, a boolean set to `true` when 'at least one navigation happened' as stated [internally](https://github.com/angular/angular/blob/eea2b0f288eec889d56afb07dad21f75e77f1241/packages/router/src/router.ts#L327). For some reason, in the piped `catchError` block handling the case where a guard returned a `UrlTree` to be used as a redirection, that boolean was invariably set to `true`. Then, when the router would process the new navigation, in that case the redirection to the root path, it would discard it as that path was considered already navigated to.

I learned *a lot* in the process about both [VS Code debugging tools](https://code.visualstudio.com/docs/editor/debugging) and Angular's router inner workings. This led to my [first pull request on a project that size](https://github.com/angular/angular/pull/28271). Before committing the patch, I also had to set up the right environment for a local run of the *lengthy* [full Angular test suite](https://github.com/angular/angular/blob/d6cfe2ed7ef32b0cca9b164789473e12c385075e/docs/BAZEL.md). I ended up spending a lot more time than anticipated as I had to switch versions for some packages, install missing dependencies and use a whole new tool to me, [Bazel](https://bazel.build/).

### Taking shape

At that point, I had enough in place to be able to finally focus on component creation. It felt great to see my application getting its features implemented one-by-one. A good amount of work went into the layout design. I wanted the UI to look good and be well structured. My daily practice of CSS was really paying off as I was less and less prone to the trial and error approach and was able to write styles with more confidence.

One key aspect of component design was finding a way to properly handle the flow of data between components. Apart from the use of services, one way to get data to a child component wasthe [Input decorator](https://angular.io/api/core/Input), and to the parent component, an [EventEmitter](https://angular.io/api/core/EventEmitter). Another key aspect was the proper handling of observables. For instance, to prevent memory leaks, it is good practice to unsubscribe on component destruction. That can become quite cumbersome when you have multiple subscriptions in a single component. With that in mind, I chose to make use of Angular's [async pipe](https://angular.io/api/common/AsyncPipe) as much as possible as it handles it automatically.

Another feature I wanted to implement was a toast notification service. It was important to give feedback to user actions, and that was one way to do it. The service was just a single point of entry for broadcasting messages. Most of the logic came in a shared component which subscribed to the service stream. I chose to implement a queue system to ensure each message had a controllable lifetime and also added the option to make them either auto-dismissible or requiring a user action depending on the significance of the message.

## License

The social icons are from [Simple Icons](https://github.com/simple-icons/simple-icons) and under [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/).

This project's codebase is under the [MIT license](LICENSE) and its graphics under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
