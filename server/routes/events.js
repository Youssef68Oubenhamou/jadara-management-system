import express from "express"
import {getEvents,createEvent,updateEvent,deleteEvent} from "../controllers/eventController.js"

const router = express.Router();
router.post('/create',createEvent)
router.get('/get',getEvents)
router.put('/update/:id',updateEvent)
router.delete('/remove/:id',deleteEvent )

export default router;