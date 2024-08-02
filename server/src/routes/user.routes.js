import { Router } from "express";
import user from "../controllers/user.controller.js";
import {verifyJWT} from '../middlewares/auth.middleware.js'
const router = Router()

router.route('/register').post(user.registerUser)
router.route('/login').post(user.loginUser)
router.route('/logout').post(verifyJWT,user.logoutUser)
router.route('/changePassword').post(verifyJWT,user.changeUserPassword)
router.route('/currentUser').get(verifyJWT,user.getCurrentUser)
router.route('/updateEducationDetails').post(verifyJWT,user.updateEducationDetails)
router.route('/updateExperienceDetails').post(verifyJWT,user.updateExperienceDetails)
router.route('/updateSkillsDetails').post(verifyJWT,user.updateSkillsDetails)
router.route('/getEducationDetails').get(verifyJWT,user.getEducationDetails)
router.route('/getExperienceDetails').get(verifyJWT,user.getExperienceDetails)
router.route('/getAchievementDetails').get(verifyJWT,user.getAchievementDetails)
router.route('/addEducationDetails').post(verifyJWT,user.addEducationDetails)
router.route('/addExperienceDetails').post(verifyJWT,user.addExperienceDetails)
router.route('/addAchievementDetails').post(verifyJWT,user.addAchivementDetails)
router.route('/updateAchievementDetails').post(verifyJWT,user.updateAchievements)



export default router;