import dbConnect from '@/utils/dbConnect';
import Contract from '@/models/Contract'; // Adjust path if needed

export async function POST(req) {
  try {
    await dbConnect();
    const { buyerId, farmerId, contractDetails } = await req.json();

    // Validate buyerId
    // if (!buyerId || !/^[0-9a-fA-F]{24}$/.test(buyerId)) {
    //   return new Response(JSON.stringify({ error: 'Invalid buyerId' }), { status: 400 });
    // }

    const contract = new Contract({
      buyerId,
      farmerId,
      contractDetails,
    });

    await contract.save();
    return new Response(JSON.stringify({ message: 'Contract created successfully' }), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Contract creation failed' }), { status: 500 });
  }
}
