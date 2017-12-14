# Heroes DnD

For this example we will be using some cool libraries / technologies, it expects the reader to know
about React and it is just a quick explanation and not meant to be a detailed step by step tutorial 😪.

Say we are ultra scientists in charge of assembling Mega Man, a great hero.
and our job is to put the corresponding parts in the correct place.

To get our job done, we need to have a UI that can help us drag different pieces of armor
into the main blueprint.

We are going to use:
- React.js to create our components
- React-dnd to add Drag and Drop functionality
- Webpack to build our web app
- Redux, useful to share our state and have our data conveniently organized and easy to use.

---
### Webpack configuration

Since we are using images served directly from a local directory, we need to use `file-loader` and `url-loader` plugins. Just like this:

*webpack.config.js*

```javascript
  ...
  module:{
    loaders:[
      {
        test:/\.jsx?/,
        include:APP_DIR,
        loader:'babel-loader'
      },
      // "file" loader makes sure those assets get served by WebpackDevServer.
      // When you `import` an asset, you get its (virtual) filename.
      // In production, they would get copied to the `build` folder.
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.css$/,
          /\.json$/,
          /\.bmp$/,
          /\.gif$/,
          /\.jpe?g$/,
          /\.png$/,
        ],
        loader: require.resolve('file-loader'),
        options: {
          name: 'app/images/[name].[ext]',
        },
      },
      // "url" loader works like "file" loader except that it embeds assets
      // smaller than specified limit in bytes as data URLs to avoid requests.
      // A missing `test` is equivalent to a match.
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'app/images/[name].[ext]',
        },
      },
    ]
  }
  ...
```

Other than that, it is a straight-forward webpack configuration. (In fact, it is very simple and it needs fine tuning if we want it to be useful for a real project).

---
### Building our components

*ArmorItem.js*

We are going to need a list of armor pieces, for that purpose we create the file `src/client/app/hero/components/ArmorItem.js`, 
it is a simple functional component that receives 3
props which are: `image`, `name`, `type`.
And it just renders the following box:

```javascript
<div className="box" style={{height:130}}>
  <article className="media">
    <div className="media-left">
      <figure className="image is-64x64">
        <img src={image} alt="armor" />
      </figure>
    </div>
    <div className="media-content">
      <div className="content">
        <p>
          <strong>{name}</strong>
          <br />
          {type}
        </p>
      </div>
    </div>
  </article>
</div>
```

*ArmorList.js*

A list of Armor Items, for every existing armor piece it renders a `ArmorItem` component. For the sake of this example, we are hardcoding our armor pieces in a list named `items`, containing all the pieces, for example the head:

```javascript
const items = [
  {
    name:'Head',
    id:'head',
    image:head,
    type:'mega man'
  },
  ...
];
```

And then we render that list using the `map` function:
```javascript
return items.map((item, index) => {
  return (
    <ArmorItem
      key={item.id}
      name={item.name}
      image={item.image}
      type={item.type}
      id={item.id}
    />
  );
});
``` 

Our armor list will render like this:

<img width="389" alt="armor list" src="https://user-images.githubusercontent.com/5360863/34001099-b3dfe15c-e0b4-11e7-80da-270d7d729c5b.png">

---
### Redux

In order to implement Redux successfully in our app, we need to install it's dependencies:
```
npm install redux react-redux --save
```
Optionally we install the developer tools
```
npm install redux-devtools-extension --save-dev
```

Once installed, we create our store in `src/client/app/store.js`

It is important to note that we are using the `composeWithDevTools` function to allow chrome redux extension
watch our Redux store and make it possible to "time travel" 👌

##### Mega Man reducer

Once we have running our store we proceed with our first reducer; the Mega Man reducer `src/client/app/hero/reducers.index.js`, this one will contain
the armor object, we need to create our action types and actions and import them in our reducer: 

```javascript
import {
  DROP_ARMOR_ITEM,
  ASSEMBLE_ARMOR,
  RESET_ARMOR
} from './../actions/types';
const defaultState = {
  armor:{
    head:{},
    torso:{},
    rightArm:{},
    leftArm:{},
    rightLeg:{},
    leftLeg:{}
  },
  assembled:false
};

export default (state = defaultState, action) => {
 switch(action.type) {
   case DROP_ARMOR_ITEM:
     return dropArmorItem(state, action.payload);
   case ASSEMBLE_ARMOR:
     return assembleArmor(state);
   case RESET_ARMOR:
     return resetArmor(state);
   default:
     return state;
 }
};

const dropArmorItem = (state, payload) => {
  // validate that key does exist in our current state hierarchy
  if(!state.armor.hasOwnProperty(payload.key)) return state;
  return{
    ...state,
    armor:{
      ...state.armor,
      [payload.key]:payload.item
    }
  };
};

const assembleArmor = state => {
  let assembled = true;
  for(const obj in state.armor){
    // validate that obj === state.armor[obj].id
    if(!(state.armor.hasOwnProperty(obj) && obj === state.armor[obj].id)){
      assembled = false;
      break;
    }
  }
  return {
    ...state,
    assembled
  };
};

const resetArmor = state => {
  return defaultState;
};
```
Each property contains the corresponding data of each part of the armor.

If we manage to configure it correctly, we can see our store in the Chrome Rredux tab:

<img width="1343" alt="screen shot 2017-12-13 at 4 00 31 pm" src="https://user-images.githubusercontent.com/5360863/33964707-f4dc6a5e-e01e-11e7-84c7-a037f607d524.png">

---
### Drag and Drop

Now we need to think about the Drag and Drop functionality, we are going to create a BluePrint container where we can Drag all the armor items to the corresponding
slot, and for that we are going to use [React DnD](http://react-dnd.github.io/react-dnd/):

```
npm install react-dnd react-dnd-html5-backend --save
```

First we need our `ArmorItem` component to be draggable, for that we create a new component called:

*ListItemDragSource.js*

This component adds the Drag functionality:

```javascript
import React, {Component} from 'react';
import { DragSource } from 'react-dnd';
import {ItemTypes} from './../dnd/types';

const DragObject = {
  beginDrag(props) {
    return{
      ...props.children.props
    }
  },
  endDrag(props, monitor, component){
    if(!monitor.didDrop())
      return;

    const elem = monitor.getDropResult();
  }
};

const collect = (connect, monitor) => {
  return{
    connectDragSource:connect.dragSource(),
    isDragging:monitor.isDragging()
  };
};

class ListItemDragSource extends Component{
  render(){
    const {connectDragSource} = this.props;
    return connectDragSource(
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default DragSource(ItemTypes.MEGA_MAN_ARMOR, DragObject, collect)(ListItemDragSource);
```

To know how React DnD works, you need to dive in the [docs](http://react-dnd.github.io/react-dnd/docs-overview.html) but long story short, we now have a draggable component and we can wrap anything inside it. 

And now we create the Component in charge of adding Droppable behaviour:

*DropSpot.js*

```javascript
import React, {Component} from 'react';
import {DropTarget} from 'react-dnd';
import {connect} from 'react-redux';
import {dropArmorItem} from './../hero/actions';
import {ItemTypes} from './types';
import isEmpty from 'lodash.isempty';

const DropObject = {
  drop(props, monitor){
    props.dropArmorItem(props.name, monitor.getItem());
    return{
      item:monitor.getItem()
    }
  }
};

const collect = (connect, monitor) => {
  return {
    connectDropTarget:connect.dropTarget()
  }
};

class DropSpot extends Component{

  renderArmorItem = () => {
    const {data} = this.props;
    return(
      <div>
        <img src={data.image} />
      </div>
    );
  };

  render(){
    const {connectDropTarget, data} = this.props;
    if(isEmpty(data)){
      return connectDropTarget(
        <div>
          {this.props.children}
        </div>
      )
    }else{
      return(
        <div>
          {this.renderArmorItem()}
        </div>
      );
    }
  }
}

const mapDispatchToProps = dispatch => {
  return{
    dropArmorItem:(key, item) => {
      dispatch(dropArmorItem(key, item));
    }
  };
};

const mapStateToProps = state => {
  const {armor} = state.megaMan;
  return{
    armor
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DropTarget(ItemTypes.MEGA_MAN_ARMOR, DropObject, collect)(DropSpot));
```

It is important to note that we are using the `connect` method of `react-redux` to connect our redux store to the component.

Now that we have our Draggable and Droppable components, it is time to wrap the `ArmorItem` in our Draggable component. 

in *ArmorList.js*

```javascript
...
return items.map((item, index) => {
  return (
    <ListItemDragSource
      key={index}
    >
      <ArmorItem
        name={item.name}
        image={item.image}
        type={item.type}
        id={item.id}
      />
    </ListItemDragSource>
  );
});
...
```

We proceed to create our Blueprint container in `BluePrint.js` using `DropSpot.js` for every droppable slot.

<img width="731" alt="screen shot 2017-12-08 at 9 37 13 am" src="https://user-images.githubusercontent.com/5360863/33964462-275344cc-e01e-11e7-9dc4-6cf33c04da1f.png">

And we create our main container called `Detail.js`:

```javascript
import React, {Component} from 'react';
import {connect} from 'react-redux';
import ArmorList from './../components/ArmorList';
import BluePrint from './../components/BluePrint';
import {
  assembleArmor,
  resetArmor
} from './../actions';
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import AssembledBody from './../components/AssembledBody';

class Detail extends Component{

  renderBluePrint = () => {
    return(
      <div>
        <div className="columns">
          <div className="column is-4">
            <ArmorList/>
          </div>
          <div className="column is-8">
            <BluePrint/>
          </div>
        </div>
        {this.renderActionButton()}
      </div>

    );
  };

  renderAssembled = () => {
    return(
      <div>
        <div className="columns">
          <div className="column is-12">
            <AssembledBody/>
          </div>
        </div>
        <div className="columns">
          <div className="column is-12">
            {this.renderResetButton()}
          </div>
        </div>
      </div>

    );
  };

  renderActionButton = () => {
    return(
      <div className="columns">
        <div className="column is-12">
          <button
            className="button is-success"
            onClick={() => this.props.assembleArmor()}
          >
            Assemble!
          </button>
        </div>
      </div>
    );
  };

  renderResetButton = () => {
    return(
      <div className="columns">
        <div className="column is-12">
          <button
            className="button"
            onClick={() => this.props.resetArmor()}
          >
            Reset&nbsp;<span><i className="fa fa-repeat"/></span>
          </button>
        </div>
      </div>
    );
  };

  render(){
    return (
      <div className="container">
        {(this.props.assembled) ?
          this.renderAssembled()
          :
          this.renderBluePrint()
        }
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return{
    assembleArmor:() => {
      dispatch(assembleArmor());
    },
    resetArmor:() => {
      dispatch(resetArmor());
    }
  };
};

const mapStateToProps = state => {
  const {assembled} = state.megaMan;
  return{
    assembled
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DragDropContext(HTML5Backend)(Detail));

```

Finally we just need a Component to render the resulting assembled armor!:

*AssembledBody.js*

```javascript
import React from 'react';
import assembledArmor from './../../images/mega_man_body.jpg'

const AssembledBody = () => {
  return(
    <img src={assembledArmor} alt="assembled armor!" />
  );
};

export default AssembledBody;

```

So, if the user assembles correctly all of Mega Man parts, it will render the complete body!

<img width="1456" alt="screen shot 2017-12-13 at 4 03 33 pm" src="https://user-images.githubusercontent.com/5360863/33964787-4850ada8-e01f-11e7-9d7f-31d55eb6c4b0.png">

