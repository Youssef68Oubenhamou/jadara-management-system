import Course from "../models/courseModel.js"


// Get all courses
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching courses' });
  }
};


// Create course
export const createCourse = async (req, res) => {
  try {
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(400).json({ message: 'Error creating course' });
  }
};

// Update course
export const updateCourse = async (req, res) => {
  const { id : _id} = req.params;
  try {
    const course = await Course.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error updating course' });
  }
};

// Delete course
export const deleteCourse = async (req, res) => {
  const { id:_id } = req.params;
  try {
    await Course.findByIdAndDelete(_id);
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting course' });
  }
};