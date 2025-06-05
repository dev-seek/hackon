import User from '@/models/User';
import dbConnect from '@/lib/dbConnect';

export async function POST(request) {
  await dbConnect();
  try {
    const body = await request.json();
    const { email, password } = body;
    
    // Find user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return Response.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    }

    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return Response.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    }

    // Return user without password
    const userResponse = user.toObject();
    delete userResponse.password;

    return Response.json({ success: true, data: userResponse }, { status: 200 });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}