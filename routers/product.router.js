const { multipleupload } = require("../config/multer.config")
const {createProduct, getAllProduct, getAllProductSeller, updateProduct, deleteProduct, uploadPicture } = require("../services/product.service")
const router = require("express").Router()

router.post("/create",multipleupload.single("image"),createProduct)
router.get("/all",getAllProduct)
router.get("/user/:id",getAllProductSeller)
router.put("/update/:id",updateProduct)
router.put("/update/image/:id",multipleupload.single("image"),uploadPicture)
router.delete("/del/:id",deleteProduct)

module.exports = router