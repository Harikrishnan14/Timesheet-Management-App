import { NextApiRequest, NextApiResponse } from 'next';
import timesheetData from '../../../SampleData.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const {
        query: { week },
        method,
    } = req;

    if (method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const weekNumber = parseInt(week as string, 10);
    const weekData = timesheetData.find((item) => item.week === weekNumber);

    if (!weekData) {
        return res.status(404).json({ message: 'Week not found' });
    }

    return res.status(200).json([weekData]);
}
