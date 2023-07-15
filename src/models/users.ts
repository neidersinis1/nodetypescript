import mongoose from 'mongoose';
// import { User } from '../interface/user.interface';

// User Config
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
},
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserModel = mongoose.model('Users', UserSchema);

export default UserModel

// User Actions
