const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);
    const statusCode = err.status || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({ error: message });
  };
  
  export default errorMiddleware;

export const requiredField = (requiredKeys,next) => {
  console.log("requiredKeys---",requiredKeys);
  
}
  