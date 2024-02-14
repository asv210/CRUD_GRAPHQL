import { User } from "../Schema/User.js";
import bcrypt from "bcrypt";
import { createResult } from "../Utils/utility.js";
export const UserRoot = {
  createUser: async ({ input }) => {
    try {
      const isAlreadyRegistered = await User.findOne({
        email: input.email.toLowerCase(),
      });
      if (isAlreadyRegistered) throw new Error("Email id already exists");
      const { email, password, ...rest } = input;
      const hash = await bcrypt.hash(password, 10);
      const data = {
        ...rest,
        email: email.toLowerCase(),
        password: hash,
      };
      const user = new User(data);
      await user.save();
      return createResult({
        data: user,
        message: "User created Successfully",
        status: 201,
      });
    } catch (error) {
      throw error || "Failed to create user";
    }
  },

  loginUser: async ({ input }) => {
    const { email, password } = input;
    try {
      const user = await User.findOne({ email });
      if (!user) throw new Error("Invalid Email");
      const hash = await bcrypt.compare(password, user.password);
      if (!hash) throw new Error("Incorrect Password");
      return createResult({
        data: user,
        status: 200,
        message: "Logged In successfully",
      });
    } catch (err) {
      throw err || "Failed to fetch";
    }
  },
  getAllUser: async () => {
    try {
      const users = await User.find();
      console.log(users);
      return users;
    } catch (error) {
      throw new Error("Failed to fetch users");
    }
  },
  getUser: async ({ input }) => {
    const { id } = input;
    try {
      const user = await User.findById(id);
      if (!user) throw new Error("No such user found");
      return createResult({
        data: user,
        message: "User fetched successfully",
        status: 200,
      });
    } catch (err) {
      throw err || "failed to fetch user";
    }
  },
  updateUser: async ({ input }) => {
    const { id, ...update } = input;
    try {
      const user = await User.findByIdAndUpdate(id, update, { new: true });
      if (!user) throw new Error("user not exist");

      return createResult({
        data: user,
        message: "User updated Successfully",
        status: 200,
      });
    } catch (err) {
      throw err || "Update failed";
    }
  },
  deleteUser: async ({ input }) => {
    const { id } = input;
    try {
      const user = await User.findByIdAndDelete(id);
      if (!user) throw new Error("user not exist");

      return createResult({
        data: user,
        message: user ? "User deleted Successfully" : "user does not exist",
        status: 200,
      });
    } catch (err) {
      throw err || "Update failed";
    }
  },
};
