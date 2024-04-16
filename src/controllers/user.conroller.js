import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { fileUploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiRersponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // Step 1:- get dat from the frontend;
  // Step 2:- Validation
  // Step 3:- Check if user already exists by checking userName and email
  // Step 4:- Check for Images and avtar
  // Step 5:- upload them into cloudnary -- avatar
  // Step 6:- create a user object - create entry in DB
  // Step 7:- remove password and refresh token field from response
  // Step 8:- check for user creation
  // Step 9:- return res

  // Step 1:- get dat from the frontend;
  const { fullName, email, username, password } = req.body;

  console.log(req.body);
  console.log(req.files);
  // Step 2:- Validation
  if (
    [username, email, fullName, password].some(
      (fields) => fields?.trim() === ""
    )
  ) {
    throw new ApiError(
      400,
      "username,email,fullName,password are mandatory feilds"
    );
  }
  // Step 3:- Check if user already exists by checking userName and email
  const existingUser = User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    throw new ApiError(409, "User with this Email or Username alredy exists");
  }
  // Step 4:- Check for Images and avtar
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Please upload an avatar");
  }

  // Step 5:- upload them into cloudnary -- avatar

  const avatar = await fileUploadOnCloudinary(avatarLocalPath);

  const coverImage = await fileUploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Please Upload an Avatar ");
  }

  // Step 6:- create a user object - create entry in DB

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });
  // Step 7:- remove password and refresh token field from response

  const createdUser = await User.findById(user.id).select(
    "-password -refreshToken"
  );

  // Step 8:- check for user creation

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user ");
  }

  // Step 9:- return response
  
 return res.status(201).json(
    new ApiRersponse(200 ,createdUser , "Created User Successfully")
 )
});

export { registerUser };
