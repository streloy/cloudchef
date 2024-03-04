const router = require("express").Router();
const upload = require("./upload.controller");
const multer = require("multer");

const storage = multer.memoryStorage();
const fileUpload = multer({ storage: storage });

router.get("/", upload.controllerGetData);
router.post("/", fileUpload.single("file"), upload.controllerSetData);

router.get("/", (req, res)=> {
    
});


module.exports = router;
