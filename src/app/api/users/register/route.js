import User from '@/models/User';
import dbConnect from '@/lib/dbConnect';

export async function POST(request) {
  await dbConnect();
  try {
    const body = await request.json();
    const { name, email, password } = body;
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json({ success: false, error: 'Email already exists' }, { status: 400 });
    }
    // Create new user
    const newUser = new User({ name, email, password });
    await newUser.save();
    const userResponse = newUser.toObject();
    delete userResponse.password;
    return Response.json({ success: true, data: userResponse }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
