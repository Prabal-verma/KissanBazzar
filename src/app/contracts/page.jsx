import dbConnect from '../../../../utils/dbConnect';
import Contract from '../../../../models/Contract'; // Adjust path as necessary
import jwt from 'jsonwebtoken';

// Named export for the GET method
export async function GET(req) {
  await dbConnect();

  try {
    // Extract the token from headers
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return new Response(JSON.stringify({ message: 'Token missing' }), {
        status: 401,
      });
    }

    // Verify token and extract user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const farmerId = decoded.id;

    // Fetch contracts for the farmer
    const contracts = await Contract.find({ farmer: farmerId }).exec();

    return new Response(JSON.stringify(contracts), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Error fetching contracts', error: error.message }),
      {
        status: 500,
      }
    );
  }
}