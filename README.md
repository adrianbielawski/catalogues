# Catalogues

## Description

Cataloging website allows you to catalogue anything you like in public or private catalogues with custom also public or private decsription fields. \
Browse catalogues, comment, rate and follow them to be allways up to date with the latest items from your favourite catalogues. \
Interested in some specific items? Just filter, sort or search any items in any catalogue of your choice. \
Simple layout and full responsivity makes it easy to use on any device.

To play around go to
https://catalogues.adrian.bielaw.ski  \
To log in just use **email:** demo<!---->@catalogues.example, **password:** password

## Technology

App built with TypeScript, React (functional components, custom hooks and context for complex, reusable components),
Redux with toolkit and redux-observables.
Libraries like Lodash, Moment, Axios, Query-string, React-player and React-leflet.
It even uses my own [orderable-list](https://github.com/adrianbielawski/orderable-list) component
and [useSwipe](https://github.com/adrianbielawski/use-swipe) react hook published on [NPM](https://www.npmjs.com/search?q=adrianbielawski).

## Screenshots

Do not pay attention to the content. It is just random text and pictures generated automatically everyday :)

#### Homepage

Browse latest catalogues, latest items and highest rated items. All on one page on desktop or simple swipe on mobile
Desktop | Smartphone
------- | -------
![homepage](https://user-images.githubusercontent.com/57548494/119779298-6f958400-bec0-11eb-935c-7820f59e9b51.jpg) | ![homepage_mobile](https://user-images.githubusercontent.com/57548494/119780600-ec752d80-bec1-11eb-9cae-18c40b7bfaf5.jpg)

#### User dashboard

Browse catalogues recomended to you, latest items from your followed catalogues, highest rated items from all catalogues. \
User dashboard is available only to logged in users.
Desktop | Smartphone
------- | -------
![user_dashboard](https://user-images.githubusercontent.com/57548494/119781833-5d691500-bec3-11eb-9470-55c5cf0b752d.jpg) | ![user_dashboard_mobile](https://user-images.githubusercontent.com/57548494/119781857-65c15000-bec3-11eb-84c9-f6318316c8fc.jpg)

#### Demo user / [Photo catalogue](https://catalogues.adrian.bielaw.ski)

This is the view of Photo catalogue on Demo user. \
To play around as demo user go to https://catalogues.adrian.bielaw.ski/login and use \
**email:** demo<!---->@demo.com, **password:** password
Desktop | Smartphone
------- | -------
![demo_user_photo_catalogue](https://user-images.githubusercontent.com/57548494/119795032-fbfb7300-becf-11eb-8f93-102a53189555.jpg) | ![demo_user_mobile](https://user-images.githubusercontent.com/57548494/119794672-a3c47100-becf-11eb-8c5d-be3f8426cdc4.gif)

#### Favourite items

Browse your favourite items. Sort, filter or search particular one.
Desktop | Tablet | Smartphone
------- | ------ | ---------
![favourite_items](https://user-images.githubusercontent.com/57548494/119782583-4676f280-bec4-11eb-959f-c6d91d24c4f5.jpg) | ![favourite_items_iPad](https://user-images.githubusercontent.com/57548494/119782654-5abaef80-bec4-11eb-9615-3e8dc52a1d9e.jpg) | ![favourite_items_mobile](https://user-images.githubusercontent.com/57548494/119782687-64dcee00-bec4-11eb-8289-d484e806002b.jpg)

#### Large images carousel

Simple click on image. Desktop only.
Screenshot | GIF
------- | ------
![carousel_modal](https://user-images.githubusercontent.com/57548494/119783197-e765ad80-bec4-11eb-9455-7b46efc0f16f.jpg) | ![carousel_modal](https://user-images.githubusercontent.com/57548494/119786342-0154bf80-bec8-11eb-81c7-df073c553801.gif)

#### Full screen comments view

Simple click on show all comments.
Desktop | Smartphone
------- | ------
![comments_modal](https://user-images.githubusercontent.com/57548494/119783645-504d2580-bec5-11eb-86da-7bde2fca5cfb.jpg) | ![comments_modal_mobile](https://user-images.githubusercontent.com/57548494/119783697-5f33d800-bec5-11eb-9a1c-8599fde83fc2.jpg)

#### Easy navigation

Simple, clear, fully responsive.

Desktop nav | Smartphone filters
------- | ------
![nav_bar](https://user-images.githubusercontent.com/57548494/119784111-c81b5000-bec5-11eb-8d95-33e8947cdf2c.gif) | ![filters_bar](https://user-images.githubusercontent.com/57548494/119784207-e41ef180-bec5-11eb-8367-f2d0e5e80aba.gif)


#### Item fields

Add fields to the item so users can lern more about it. \
Choose from text, single or multiple choice or even geo location or URL types

Location field | URL field
------- | ------
Choose point on the map and it will appear as shown underneath | Type your URL and it will appear as shown underneath. It will open in new tab if unable to play video.
![map_field1](https://user-images.githubusercontent.com/57548494/119801312-7ed2fc80-bed5-11eb-8b6b-2954825f7522.gif) | ![media_field1](https://user-images.githubusercontent.com/57548494/119801393-94482680-bed5-11eb-9570-3e9728ce97f5.gif)
