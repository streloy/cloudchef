const upload = require("./upload.service");
const util = require("../util");

exports.controllerGetData = (req, res) => {
  upload.serviceGetData(req.params, (err, result) => {
    if (err) {
      return util.failedOutput(res, "Failed to load load data.", err);
    }
    return util.successOutput(res, "Data has been loaded.", result);
  });
};

exports.controllerSetData = (req, res) => {
  const file = req.file;
  
  /* File exits checking */
  if (!file) {
    return util.failedOutput(res, "No file found!");
  }

  /* JSON File exits checking */
  if (file.mimetype !== "application/json") {
    return util.failedOutput(res, "No Json file found!");
  }

  const jsonData = JSON.parse(Buffer.from(file.buffer).toString("utf-8"));

  /* Maximum depth level checking */
  let level = levelCheck(jsonData);
  if (level > 5) {
    return util.failedOutput(
      res,
      "Tree's maximum depth will not exceed five levels!"
    );
  }

  /* Maximum child node checking */
  let nodeLimit = childCheck(jsonData);
  if (nodeLimit === false) {
    return util.failedOutput(
      res,
      "Each node can have up to four children! Your data exist limit!"
    );
  }

  upload.serviceSetData(jsonData, (err, result) => {
    if (err) {
      return util.failedOutput(res, "Failed to load data.", err);
    }
    return util.successOutput(res, "Data has been loaded.", result);
  });
};

function levelCheck(data) {
  let level = 0;
  let parent = "";
  let child = [];

  data.forEach((item) => {
    if (item.parentName === null) {
      parent = item.name;
      item.childrenNames.forEach((itemChild) => {
        child.push(itemChild);
      });
      level++;
    }
  });

  data.forEach((element) => {
    if (element.name === parent && level === 1) {
      parent = child[0];
      if (element.childrenNames.length > 0) {
        level++;
      }
      data.forEach((element2) => {
        if (element2.name === parent) {
          element2.childrenNames.forEach((itemChild2) => {
            child.push(itemChild2);
          });
        }
      });
      child.shift();
    } else if (element.name === parent) {
      parent = child[0];
      if (element.childrenNames.length > 0) {
        level++;
      }
      data.forEach((element2) => {
        if (element2.name === parent) {
          element2.childrenNames.forEach((itemChild2) => {
            child.push(itemChild2);
          });
        }
      });
      child.shift();
    }
  });

  return level;
}

function childCheck(data) {
  let check = true;
  for (let i = 0; i < data.length; i++) {
    if (data[i].childrenNames.length > 4) {
      check = false;
      break;
    }
  }
  return check;
}
