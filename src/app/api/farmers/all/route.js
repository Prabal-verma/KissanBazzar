import dbConnect from '@/utils/dbConnect';
import Farmer from '@/models/Farmer';


export async function GET(req) {
    await dbConnect();
  
    try {
      const farmers = await Farmer.find();
      return new Response(
        JSON.stringify(farmers),
        { status: 200 }
      );
    } catch (error) {
      console.error('Error fetching farmers:', error);
      return new Response(
        JSON.stringify({ message: 'Error fetching farmers', error: error.message }),
        { status: 500 }
      );
    }
  }
