const router = require("express").Router()
const controller = require("./controllers")

router.get("/", async (req, res) => {
    await controller.retrieve_all_tasks(req, res)
})
router.post("/", async (req, res) => {
    await controller.create_task(req, res)
})
router.patch("/:id", async (req, res) => {
    await controller.update_task(req, res)
})
router.get("/:id", async (req, res) => {
    await controller.get_task(req, res)
})
router.delete("/", async (req, res) => {
    await controller.delete_tasks(req, res)
})
router.delete("/:id", async (req, res) => {
    await controller.delete_task(req, res)
})

module.exports = router