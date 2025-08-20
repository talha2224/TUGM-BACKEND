const { multipleupload } = require("../config/multer.config")
const {createProduct, getAllProduct, getAllProductSeller, updateProduct, deleteProduct, uploadPicture, getSingleProduct } = require("../services/product.service")
const router = require("express").Router()

router.post("/create",multipleupload.array("images", 5),createProduct)
router.get("/all",getAllProduct)
router.get("/user/:id",getAllProductSeller)
router.get("/single/:id",getSingleProduct)
router.put("/update/:id",updateProduct)
router.put("/update/image/:id",multipleupload.single("image"),uploadPicture)
router.delete("/del/:id",deleteProduct)

module.exports = router