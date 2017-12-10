#Heroes DnD

For this example we will be using some cool libraries / technologies

Say we are ultra scientists in charge of assembling Mega Man, a great hero.
and our job is to put the corresponding parts in the correct place.

To get our job done, we need to have a UI that can help us drag different pieces of armor
into the main blueprint.

we are going to use:
- React.js to create our components
- React-dnd to add Drag and Drop functionality
- webpack to build our web app
- Redux, useful to share our state and have our data conveniently organized and easy to use.

---
### Webpack configuration

*TODO: explain webpack conf*

---
### Building our components

#####ArmorItem.js
We are going to need a list of armor pieces, for that purpose we create the file `src/client/app/hero/components/ArmorItem.js`, 
it is a simple functional component that recieves 3
props which are: `image`, `name`, `type`.

#####ArmorList.js
A list of Armor Items, for every existing armor piece it renders a `ArmorItem` component. 

*TODO: add each container*

---
###Redux

In order to implement Redux successfully in our app, we need to install it's dependencies:
```
npm install redux react-redux --save
```
Optionally we install the developer tools
```
npm install redux-devtools-extension --save-dev
```

Once installed, we create our store, we create our store in `src/client/app/store.js`

It is important to note that we are using the `composeWithDevTools` function to allow chrome redux extension
watch our Redux store and make it possible to "time travel" 👌

#####Mega Man reducer
Once we have running our store we proceed with our first reducer; the Mega Man reducer, this one will contain
the armor object, for now it will be declared as the following JSON:

```
  armor:{
    head:{},
    torso:{},
    rightArm:{},
    leftArm:{},
    rightLeg:{},
    leftLeg:{}
  }
```
Each property contains the corresponding data of each part of the armor.
