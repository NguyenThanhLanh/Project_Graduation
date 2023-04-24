module.exports = function myFunction(res, statuCode, message) {
  return {
    status: statuCode,
    message: message,
  };
};
