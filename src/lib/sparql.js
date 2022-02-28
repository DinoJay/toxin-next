
export const endpointMaker = (n) => `https://wise.vub.ac.be/fuseki/${n}/sparql`;
// export const endpointMaker = (n) => `http://localhost:3030/${n}/sparql`;
export const constructQuery = (e, q) => `${endpointMaker(e)}?query=${encodeURIComponent(q)}&format=json`;

