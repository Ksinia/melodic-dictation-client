# :musical_note: Melodic Dictation :musical_note:

This is the frontend of Melodic Dictation application.
[Here is the backend](https://github.com/Ksinia/melodic-dictation-server).

## [Check out the deployed version here!](https://melodic-dictation.netlify.com)

Melodic dictation is an important excercise in process of learning solfeggio.
In this app user can listen to the melodies, input the notes and get the validation of his input compared to the original notes.

## Details

### List of melodies

List of melodies shows:

- Melody names with the link on melody details page
- Play button for each melody
- Popularity of the melody which is the quantity of dictations users created with this melody

![Screenshot of the list of melodies](https://user-images.githubusercontent.com/42918058/72618605-cd64a400-393b-11ea-9da0-c4e3e7f54abb.png)

[Pull request with the 'list of melodies' page](https://github.com/Ksinia/melodic-dictation-client/pull/5)

### Melody details page

Melody details page has the following features (for logged in users):

- Play the original melody
- Create new dictation answer
- Input notes
- Play user input
- Show original melody notes after an answer is submitted
- Show score
- Show info about previous dictations with this melody by this user

![Screenshot for melody details page with dictation](https://user-images.githubusercontent.com/42918058/72616378-19611a00-3937-11ea-89ab-438fb1c9a53e.png)

[Pull request which adds melody details page](https://github.com/Ksinia/melodic-dictation-client/pull/4)

## Installation

- Clone the repository
- Run npm install
  ```
  npm install
  ```

The frontend sends requests to the backend deployed to [Heroku](https://melodic-dictation.herokuapp.com).

If you want to install backend for this app:

- Clone [this repository](https://github.com/Ksinia/melodic-dictation-server)
- Run mpn install for the backend
- Set up PostgreSQL database
- Change `url` in 'url.js' in the frontend to your local sever's url

## Technologies used

- react
- redux
- redux-thunk
