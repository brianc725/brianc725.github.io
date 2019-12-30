# Personal Website 2019

## Introduction

The goal of this project is to replace my website that is currently at brianc725.github.io. I want to include a backend which will allow for easier modifiability and dynamic loading of assets. The frontend will now be in react.

## Overall Architecture

### Frontend

Frontend is written in React with pages separated by screens and components.

### Backend

The backend utilizes Firebase with Cloud Firestore to act as the db for this website. It allows for easy authentication and quick additions, updates, and deletions. Each page of the site acts as a different collection so that the frontend component could just listen on that one component and render the page.

### Deployment

`npm run deploy`

If gh-pages branch already exists, run `rm -rf node_modules/gh-pages/.cache`.