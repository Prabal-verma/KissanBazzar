// pages/api/contracts/update.js
import dbConnect from '@/utils/dbConnect';
import Contract from '@/models/Contract';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { contractId, status } = req.body;

    try {
      const contract = await Contract.findByIdAndUpdate(
        contractId,
        { status },
        { new: true }
      );

      if (!contract) {
        return res.status(404).json({ message: 'Contract not found' });
      }

      return res.status(200).json(contract);
    } catch (error) {
      return res.status(500).json({ message: 'Error updating contract', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
