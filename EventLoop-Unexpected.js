/**
 * When we do multiple tasks a once we sometimes see unexpected results due to event loop and libuv thread pool
 * For example:
 * 
 * Doing an HTTP request, fs operation and crypto hashes results in the fs operation being slowed done due to how nodejs handles I/O events
 * 
 * a fs.readFile operation on a small file should take ~30ms.
 * 
 * The first thing to nate is the HTTP request does not share the libuv threadpool since it's actually deligated to the OS to complete this operation.
 * 
 * When a fs.readFile operation is called it reaches out to the HD for gather the requested file info. The event loop assumes this operation will take some time
 * and makes the thread available to handle another task. If we also queued up four crypto hashes (with thread pool for 4) the fs operation
 * would then have to wait for one those hashes to complete before it can access a thread to complete it's task. 
 *  
 * Doing only a HTTP request and fs.fileRead would have results such as:
 * 
 * fs: 30ms
 * http: 300ms
 * 
 * When we add in the four crypto hashes we see the issue:
 * 
 * http: 300ms
 * hash: 1000ms
 * fs: 1001ms
 * hash: 1002ms
 * hash: 1002ms
 * hash: 1002ms
 * 
 * This shows how the fs.operation gets slowed down due to sharing a thread with one of the crypto hashes due to the eventloop giving the thread to the crypto operation
 * when it request data from the HD. Once the first hash finishes the fs operation gets that thread.
 * 
 * Resolve by:
 * 
 * Keeping this in mind during development to ensure we are not blocking fs operations
 * Increasing threadpool size when nessessary and possible?
 * Using node in 'Cluster' mode (multiple copies of same server) - 2018 more battle tested than worker threads and reccomended
 * User worker threads - Experimental, use with caution.
 */