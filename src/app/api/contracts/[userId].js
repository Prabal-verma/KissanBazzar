import dbConnect from '@/utils/dbConnect';
import Contract from '@/models/Contract';

export async function GET(req, { params }) {
  await dbConnect();
  const { userId } = params;

  try {
    const contracts = await Contract.find({
      $or: [{ farmerId: userId }, { buyerId: userId }]
    }).populate('farmerId buyerId'); // Populate details if needed

    return new Response(JSON.stringify(contracts), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error fetching contracts', error: error.message }), { status: 500 });
  }
}
