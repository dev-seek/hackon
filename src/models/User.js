import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const orderItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  items: [orderItemSchema],
  order_date: { type: Date, default: Date.now },
  delivery_date: Date,
  status: { 
    type: String, 
    enum: ['pending', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  }
}, { timestamps: true });

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters']
  },
  orders: [orderSchema],
  rewards: {
    type: Number,
    default: 0,
    min: [0, 'Rewards cannot be negative']
  },
  mode_of_payment: {
    type: String,
    enum: ['credit_card', 'paypal', 'cash_on_delivery', 'crypto'],
    default: 'credit_card'
  },
  eco_agree: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

// Password hashing middleware
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Password verification method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Virtual for order count
userSchema.virtual('orderCount').get(function() {
  return this.orders.length;
});

export default mongoose.models.User || mongoose.model('User', userSchema);