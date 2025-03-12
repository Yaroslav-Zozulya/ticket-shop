import { Schema, model, Model, Document } from "mongoose";
import { Password } from "../services/password";

interface IUserAttr {
  email: string;
  password: string;
}

interface IUserModel extends Model<IUserDoc> {
  build(attrs: IUserAttr): IUserDoc;
}

interface IUserDoc extends Document {
  email: string;
  password: string;
}

const userSchema = new Schema<IUserDoc, IUserModel>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

userSchema.statics.build = (attrs: IUserAttr) => {
  return new UserModel(attrs);
};

const UserModel = model<IUserDoc, IUserModel>("User", userSchema);

export { UserModel };
