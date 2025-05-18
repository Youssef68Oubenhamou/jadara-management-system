  import express from "express";
  import verifyRole from "../middlewares/verifyRole.js"
  import {createCourse , getCourses , updateCourse, deleteCourse} from "../controllers/courseController.js"
  
  const router = express.Router();
  
  
  router.post('/create', verifyRole ,createCourse);
  router.get('/get', getCourses);
  router.put('/update/:id', verifyRole,updateCourse);
  router.delete('/remove/:id', verifyRole ,deleteCourse);


  export default router;

 