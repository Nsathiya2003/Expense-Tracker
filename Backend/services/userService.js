import User from '../models/userModel.js';  // Assuming MongoDB with Mongoose ORM

export const createUser = async (userData) => {
  // Adding performance improvements like ensuring indexes on frequently queried fields in DB
  const user = new User(userData);
  await user.save(); 
  return user;
};
