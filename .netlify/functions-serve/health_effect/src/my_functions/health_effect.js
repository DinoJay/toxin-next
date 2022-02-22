var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// my_functions/health_effect.js
__export(exports, {
  constructQuery: () => constructQuery,
  endpointMaker: () => endpointMaker
});
var endpointMaker = (n) => `https://wise.vub.ac.be/fuseki/${n}/sparql`;
var constructQuery = (e, q) => `${endpointMaker(e)}?query=${encodeURIComponent(q)}&format=json`;
exports.handler = async function(event, context) {
  console.log("context", context);
  console.log("event", event);
  return {
    statusCode: 200,
    body: JSON.stringify(res)
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  constructQuery,
  endpointMaker
});
//# sourceMappingURL=health_effect.js.map
