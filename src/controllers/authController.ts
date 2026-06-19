import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User";
import { IAuthPayload } from "../types/auth";
import { registerDto, loginDto } from "../dto/authDto";
import { zodToFieldErrors } from "../errors/zodErrors";

const SECRET_KEY = process.env.JWT_SECRET;
export const register: RequestHandler = async (req, res) => {
  try {
    const result = registerDto.safeParse(req.body);
    if (!result.success) {
      const errors = zodToFieldErrors(result.error);
      res.status(400).json({ success: false, ...errors });
      return;
    }
    const { username, email, password } = result.data;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ success: false, message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Generate JWT
    const payload: IAuthPayload = {
      userId: newUser.id,
      username: newUser.username,
    };
    const token = jwt.sign(payload, SECRET_KEY as string, { expiresIn: "1h" });
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        username,
        email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: `Server error: ${error}` });
  }
};

export const login: RequestHandler = async (req, res) => {
  try {
    const result = loginDto.safeParse(req.body);
    if (!result.success) {
      const errors = zodToFieldErrors(result.error);
      console.log(errors);
      res.status(400).json({ success: false, ...errors });
      return;
    }
    const { email, password } = result.data;

    // Check if email is in db
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ success: false, message: "Invalid credentials " });
      return;
    }

    // Compare Passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ success: false, message: "Invalid credentials" });
      return;
    }

    // Generate JWT
    const payload: IAuthPayload = { userId: user.id, username: user.username };
    const token = jwt.sign(payload, SECRET_KEY as string, { expiresIn: "1h" });
    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false,  message: `Server error: ${error}` });
  }
};
