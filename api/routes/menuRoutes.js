const express = require("express");

const router = express.Router();

const {
    getAllMenu,
    getCategories,
    getMenuStats,
    getMenuById,
    createMenu,
    updateMenu,
    deleteMenu
} = require("../controllers/menuControllers");

// Special routes (must come before /:id)
router.get("/categories", getCategories);
router.get("/stats", getMenuStats);

// General CRUD routes
router.get("/", getAllMenu);
router.get("/:id", getMenuById);
router.post("/", createMenu);
router.put("/:id", updateMenu);
router.delete("/:id", deleteMenu);

module.exports = router;