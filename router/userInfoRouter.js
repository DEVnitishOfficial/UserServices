import { Router } from "express";

const router = Router();
import {submitForm, getUser} from "../controller/userInfoController.js";
import upload from "../middleware/multerMiddleware.js";

router.post('/submitForm', upload.single('avatar'),submitForm)
router.get('/getUser/:fullName',getUser)


export default router