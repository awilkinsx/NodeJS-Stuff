/**
 * Thoughts on clustering
 * 
 * Nodejs event loop single thread flow
 * 
 * Request => node server => response
 * 
 * Works great on quick tasks, however and issues arises if the server takes an extended amount of time.
 * 
 * for example if we pass the following function into a GET request on a node api:
 * 
 * function doWork(duration) {
 *  const start = Date.now();
 *  while(Date.now() - start < duration) {}
 * }
 * 
 * every request will be locked up for ~5 seconds. This means that if multiple request come in at around the same tme we will see the folowing:
 * 
 * 1st request: 5 seconds
 * 2nd request: 10 seconds
 * 3rd request: 15 seconds
 * 
 * This is due to the function blocking the node servers single event loop thread on each request. This deminstrates how any
 * operation that takes time to complete can create issues acrossed the app.
 * 
 * Cluster manager:
 * 
 * Keeps track of health of all
 * Starts nodes
 * stop nodes
 * restart nodes
 * does no application logic such as db, authentication, etc..
 * 
 * Typical node server flow
 * 
 * run 'node server.js' => server.js started => node instance is ready for work
 * 
 * Cluster node server flow
 * 
 * run 'node server.js => server.js started => starts cluster manager => node cluster module 'cluster.fork()' => started server.js => starts worker instance
 * 
 * see clustering.js for example of built in node clustering
 * 
 * PM2 info:
 * 
 * to start app in cluster mode on pm2 use 'pm2 start server.js -i {number of instances, 0 = match logical cores}
 * 
 */