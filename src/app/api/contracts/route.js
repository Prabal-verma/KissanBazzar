import dbConnect from '@/utils/dbConnect';
import Contract from '@/models/Contract'; // Adjust the path if needed

// POST request handler for creating a contract
export async function POST(req) {
  try {
    await dbConnect();
    const {
      buyerId,
      farmerId,
      cropType,
      quantity,
      startDate,
      endDate,
      pricePerUnit,
      status, // Adding status field
    } = await req.json();

    // Create a new contract with the provided data
    const contract = new Contract({
      buyerId,
      farmerId,
      cropType,
      quantity,
      startDate,
      endDate,
      pricePerUnit,
      status,
    });

    // Save the contract to the database
    await contract.save();
    return new Response(
      JSON.stringify({ message: 'Contract created successfully' }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Contract creation error:', error);
    return new Response(
      JSON.stringify({ error: 'Contract creation failed' }),
      { status: 500 }
    );
  }
}

// GET request handler for fetching contracts
export async function GET(req) {
  try {
    await dbConnect();
    
    // Extract query parameters
    const url = new URL(req.url);
    const status = url.searchParams.get('status'); // Optional: fetch contracts based on status
    const userId = url.searchParams.get('userId'); // Optional: fetch contracts for a specific user

    // Build query based on provided parameters
    const query = {};
    if (status) {
      query.status = status;
    }
    if (userId) {
      query.$or = [
        { farmerId: userId },
        { buyerId: userId }
      ];
    }

    // Fetch contracts from the database
    const contracts = await Contract.find(query).populate('farmerId buyerId');

    return new Response(
      JSON.stringify(contracts),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching contracts:', error);
    return new Response(
      JSON.stringify({ error: 'Error fetching contracts', message: error.message }),
      { status: 500 }
    );
  }
}
