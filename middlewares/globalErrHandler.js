const globalErrHandler = (err, req, res, next) => {
    //message
    //status
    //statusCode
    //stack
  
    const message = err.message;
    const statusCode = err.statusCode || 500;
    const status = err.status || "Failed";
    const stack = err.stack;
  
    res.status(statusCode).json({
      status,
      message,
      stack,
    });
  };
  
  module.exports = globalErrHandler;
  