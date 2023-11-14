import mongoose from 'mongoose';

const rectTransformSchema = new mongoose.Schema({
  transform: [Number],
  perTransform: [Number],
  layerWidth: Number,
  layerHeight: Number,
});


const dataSchema = new mongoose.Schema({
  success: Boolean,
  width: Number,
  height: Number,
  psdWidth: Number,
  psdHeight: Number,
  ifSpin: Boolean,
  spinWidth: Number,
  rectTransform: rectTransformSchema,
  spineTransform: rectTransformSchema,
});

const groupSchema = new mongoose.Schema({
  group: String,
  mockups: [String],
  data: [dataSchema],
});

export default mongoose.model('MockupData', groupSchema);
