import { NextApiRequest, NextApiResponse } from 'next';
import timesheetData from '../../../SampleData.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const {
        method,
    } = req;

    if (method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    return res.status(200).json(timesheetData);
}