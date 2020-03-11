
// the three Amigas
module.exports = function logger(req, res, next) {
    // log info about the request to the console -> GET to / 
    const method = req.method;
    const endpoint = req.originalUrl;

    console.log(`${method} to ${endpoint}`);

    next(); // moves the request to the next middleware in our situation, it moves to the router
};
