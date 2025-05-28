const ensureAuthenticated = require("./auth");
// let token = require("../Controller/AuthController").token; // Assuming token is exported from AuthController
const otherUserModel = require("../Models/otherUsers");

const router = require("express").Router();
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}



router.get('/', ensureAuthenticated, async (req, res) => {
    const data = await otherUserModel.find();
    if (!data) {
        return res.status(400).json({ message: "No data found" });
    }
    const otp = generateOTP();
    console.log(otp);
    res.status(200).json({"data":data,"code":otp });

}
);

router.delete('/:id', ensureAuthenticated, async (req, res) => {
    try {
        const { id } = req.params;
        const data = await otherUserModel.findByIdAndDelete(id);
        if (!data) {
            return res.status(400).json({ message: "No data found" });
        }
        // await otherUserModel.updateMany({}, { $inc: { token: -1 } });
        res.status(200).json({ message: "Deleted successfully" });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });

    }

}
);

module.exports = router;