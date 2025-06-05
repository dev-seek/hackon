import User from '@/models/User';
import dbConnect from '@/lib/dbConnect';

function getRandomDeliveryDate() {
  // Random delivery date between 2 and 7 days from now
  const days = Math.floor(Math.random() * 6) + 2;
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}

export async function GET(request, context) {
  await dbConnect();
  const params = await context.params;
  const { userId } = params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return Response.json({ success: false, error: 'User not found' }, { status: 404 });
    }
    return Response.json({ success: true, data: user.orders }, { status: 200 });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request, context) {
  await dbConnect();
  const params = await context.params;
  const { userId } = params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return Response.json({ success: false, error: 'User not found' }, { status: 404 });
    }
    const body = await request.json();
    let items = [];
    if (Array.isArray(body.items)) {
      items = body.items.map(item => ({
        name: item.name,
        price: Number(item.price),
        quantity: Number(item.quantity)
      }));
    } else if (body.name && body.price && body.quantity) {
      items = [{
        name: body.name,
        price: Number(body.price),
        quantity: Number(body.quantity)
      }];
    }
    const newOrder = {
      items,
      order_date: new Date(),
      delivery_date: getRandomDeliveryDate(),
      status: 'pending',
    };
    user.orders.push(newOrder);
    await user.save();
    const createdOrder = user.orders.at(-1);
    return Response.json({ success: true, data: createdOrder }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}