import { Router } from "express";

const router = Router();
import { getAadharInfo, submitAadharForm} from "../controller/aadharController.js";
import upload from "../middleware/multerMiddleware.js";

router.post('/submitAadharForm', upload.single('avatar'),submitAadharForm)
router.get('/getAadhar/:engName', getAadharInfo)


export default router