# quizzer-ui

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.4.
It's the front-end part of [quizzer project](https://github.com/AlexKruhlov/quzzer)

## Node And Angular Installing

1. Install [nvm](https://github.com/nvm-sh/nvm/blob/master/README.md)
2. Install install node - version 14.15.2, using nvm

```bash
nvm i v14.15.2
```

3. Install [angular/cli](https://cli.angular.io/) globally - version 11.0.4

```bash
sudo npm i -g @angular/cli@11.0.4
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change
any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also
use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag
for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out
the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Installing Git
Add to `~/.gitconfig` file following settings, specifying your own user info:
```bash
[alias]
  co = checkout
  ci = commit
  st = status
  di = diff
  br = branch
  sta = stash
  lola = log --graph --decorate --oneline --all
  llog = log --date=local
  flog = log --pretty=fuller --decorate
  lg = log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --addrev-commit --date=relative
  lol = log --graph --decode --online
  blog = log origin/master... --left-right
[user]
  name = 'Alexandr Kruhlov'
  email = alkruglov777@gmail.com
[core]
  autocrlf = input
  hooksPath = ./.
```

## [Installing bash-it](https://github.com/Bash-it/bash-it#installation)
