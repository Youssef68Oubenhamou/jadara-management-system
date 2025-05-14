  import express from "express";
  import {create , read, update, remove} from "../controllers/courseController"
  
  export const router = express.Router();
  
  
  router.post('/', create);
  router.get('/', read);
  router.put('/:_id', update);
  router.delete('/:_id', remove);

 