// my_functions/health_effect.js
exports.handler = async function(event, context) {
  console.log("context", context);
  console.log("event", event);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World" })
  };
};
//# sourceMappingURL=health_effect.js.map