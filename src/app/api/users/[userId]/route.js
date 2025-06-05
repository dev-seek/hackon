import User from '../../../../models/User';
import dbConnect from '../../../../lib/dbConnect';
import bcrypt from 'bcrypt';

export async function GET(request, { params }) {
  await dbConnect();
  const { userId } = params;
  try {
    const user = await User.findById(userId).select('-password');
    if (!user) return Response.json({ success: false, error: 'User not found' }, { status: 404 });
    return Response.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  await dbConnect();
  const { userId } = params;
  try {
    const updates = await request.json();
    // Handle password update separately
    if (updates.password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(updates.password, salt);
    }
    const user = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true
    }).select('-password');
    if (!user) return Response.json({ success: false, error: 'User not found' }, { status: 404 });
    return Response.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  await dbConnect();
  const { userId } = params;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) return Response.json({ success: false, error: 'User not found' }, { status: 404 });
    return Response.json({ success: true, data: {} }, { status: 200 });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}