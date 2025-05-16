  import express from "express";
  import {createCourse , getCourses , updateCourse, deleteCourse} from "../controllers/courseController.js"
  
  const router = express.Router();
  
  
  router.post('/create', createCourse);
  router.get('/get', getCourses);
  router.put('/update/:id', updateCourse);
  router.delete('/remove/:id', deleteCourse);

  export default router;

 