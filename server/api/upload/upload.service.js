//const pool = require("../../../config/database");
const uploadSchema = require("./upload.model");

exports.serviceGetData = async (data, callback) => {
  const nodes = await uploadSchema.find().limit(1000);

  let temp = [...nodes];

  let counter = 1; let res = [];
  temp.forEach(element => {
    if(element.parentName === null) { 
      let a = {};
      a.id = element.name;
      a.parent_id = null;
      a.name = element.name;
      counter++;
      res.push(a);
    } else {
      let a = {};
      a.id = element.name;
      a.parent_id = element.parentName;
      a.name = element.name;
      counter++;
      res.push(a);
    }
  });
  console.log(res);
  function buildTree(nodes, parentId = null) {
    const tree = [];
    nodes.forEach(node => {
        if (node.parent_id === parentId) {
            const children = buildTree(nodes, node.id);
            if (children.length > 0) {
                node.children = children;
            }
            tree.push(node);
        }
    });
    return tree;
  }
  const nestedTree = buildTree(res);
  console.log(JSON.stringify(nestedTree, null, 2));

  let outcome = {};
  outcome.data = nodes;
  outcome.graph = nestedTree;

  return callback(null, outcome);
};


exports.serviceSetData = async (data, callback) => {
  await uploadSchema.deleteMany({});
  data.forEach((element) => {
    const upload = uploadSchema(element);
    upload.save();
  });
  return callback(null, data);
};
