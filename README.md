# Pathfinding Visualizer

This project graphically shows how different path finding algorithms search for the finish node.
<br /><br />
Click here for a [Live Demo](https://tvdao.github.io/pathfindingVisualizer/)
<br /><br />
![Image of App](images/introPicture.png)

## Overview:

This project visualizes path finding algorithms like BFS, DFS, etc. All the algorithms
start at the green node and it searches for the red node, as shown in the image above. 
The app was all built in React.

## Intro:

I built this project to reinforce my understandings of common path finding algorithms like BFS and DFS. I had trouble imagining how these algorithms ran in my head, and I thought a visual representation of the algorithms would help my comprehension of these algorithms. Through building this project, I also got to learn more path finding algorithms like A*. 

## Meet The Algorithms:

### Breadth First Search 
- Traverses equally in each direction
- Used for unweighted graphs
- Will always find the shortest path
<br /><br />
![Image of BFS](images/bfs.png)

### Dephth First Search
- Traverses in one direction as far as possible before backtracking
- Used for unweighted graphs
- Will not always find the shortest path
<br /><br />
![Image of BFS](images/dfs.png)

### Dijkstra
- Traverses graph using the distance from node to node. Picks the smallest distance.
- Used for weighted graphs
- Will always find the shortest path
<br /><br />
![Image of BFS](images/dijkstra.png)

### A Star
- Best pathfinding algorithm out of the 4. Variation of Dijkstra's algorithm, using heuristics to guide itself.
- Used for weighted graphs
- Will always find the shortest path
<br /><br />
![Image of BFS](images/aStar.png)

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
