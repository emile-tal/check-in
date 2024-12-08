# Check-In

## Overview

Check-In is a strategic turn-based game where players place tiles on their board aiming to get the maximum amount of points. It can be played alone as a singleplayer game, or with one another person as a multiplayer game.

## Installing in Local Development Environment

1. Fork both the front-end (emile-tal-check-in) and the back end (emile-tal-check-in-backend) repositories.
2. Create a database in MySQL and input the relevant database environment variables in a .env file in the root folder of the back-end repository (see detailed list of environment variables and their names in the .env.sample file).
3. Add the local front-end URL in the .env file of the back-end repository (see correct naming in the .env.sample file).
4. Generate a JWT secret (for example using [this website](https://jwtsecret.com/generate)) and add it to the .env file of the back-end repository (see correct naming in the .env.sample file).
5. Add the local back-end URL in a .env file in the root folder of the front-end repository (see correct naming in the .env.sample file).
6. Once all environment variables have been added, run both the back-end and front-end repositories in a local development environment. 
7. See if you can beat my highscore of 89!
