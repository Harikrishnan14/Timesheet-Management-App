import Card from '@/components/Card'
import MainLayout from '@/components/MainLayout'
import { ProgressbarProps, TimesheetWeek } from '@/interfaces/next-auth'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'

const Week = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [weeklyData, setWeeklyData] = useState<TimesheetWeek[]>([])
    const [openMenu, setOpenMenu] = useState<{ day: string; idx: number } | null>(null);
    const [menuPos, setMenuPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

    const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

    const { week } = router.query

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/timesheets/${week}`);
            const json = await response.json();
            setWeeklyData(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (week) {
            fetchData();
        }
        //@ts-ignore
    }, [week])

    const handleMenuToggle = (day: string, idx: number) => {
        const key = `${day}-${idx}`;
        const button = buttonRefs.current[key];

        if (openMenu?.day === day && openMenu?.idx === idx) {
            setOpenMenu(null);
            return;
        }

        if (button) {
            const rect = button.getBoundingClientRect();
            setMenuPos({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX - 80,
            });
        }

        setOpenMenu({ day, idx });
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            const menuEl = document.getElementById('task-dropdown');
            if (menuEl && !menuEl.contains(target)) {
                setOpenMenu(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);


    function calculateTotalTimeAndPercentage(weeklyData: TimesheetWeek[]): { totalHours: number; percentage: number } {
        let totalHours = 0;

        weeklyData.forEach(week => {
            week.weeklyData.forEach(day => {
                day.tasks.forEach(task => {
                    const hoursNumber = parseFloat(task.hours);
                    if (!isNaN(hoursNumber)) {
                        totalHours += hoursNumber;
                    }
                });
            });
        });

        const percentage = (totalHours / 40) * 100;
        return {
            totalHours,
            percentage: Math.round(percentage),
        };
    }

    const { totalHours, percentage } = calculateTotalTimeAndPercentage(weeklyData);

    const Progressbar: React.FC<ProgressbarProps> = ({ totalHours, percentage }) => (
        <div className="flex flex-col items-end">
            <span className="font-medium text-[12px] leading-[150%] text-right text-gray-500">{percentage}%</span>

            <div className="relative group mt-1 cursor-pointer">
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex items-center justify-center px-2 py-1 text-white text-xs bg-gray-800 rounded-md shadow-md whitespace-nowrap z-10">
                    {`${totalHours} / 40 hrs`}
                </div>

                <div className="w-[188px] h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 rounded-full" style={{ width: `${percentage}%` }} />
                </div>
            </div>
        </div>
    )

    const Dropdown = () => (
        <div
            id="task-dropdown"
            className="absolute w-[97px] h-[82px] bg-white rounded-lg shadow-md z-50"
            style={{ top: menuPos.top, left: menuPos.left }}
        >
            <ul className="text-sm text-gray-700 font-inter">
                <li className="px-4 py-2 font-inter font-normal text-sm leading-[150%] tracking-[0%] text-gray-700 hover:cursor-pointer hover:text-gray-500">Edit</li>
                <li className="px-4 py-2 font-inter font-normal text-sm leading-[150%] tracking-[0%] text-red-600 hover:cursor-pointer hover:text-red-400">Delete</li>
            </ul>
        </div>
    )

    return (
        <MainLayout>

            <div className="mb-6">
                <Card>
                    <div className='flex items-center justify-between mb-10'>
                        <h3 className="font-inter font-bold text-2xl leading-[24px] tracking-normal">This week's timesheet</h3>
                        <Progressbar totalHours={totalHours} percentage={percentage} />
                    </div>

                    <p className='font-normal text-sm text-gray-500 leading-[150%] font-inter mb-6'>{weeklyData[0]?.date}</p>

                    {loading ? (
                        <div
                            className="w-full font-medium text-[16px] text-center text-gray-500 leading-[150%] align-middle font-inter py-3 border border-gray-200 rounded-lg"
                        >
                            Loading...
                        </div>
                    ) : (
                        weeklyData[0]?.weeklyData.map(({ day, tasks }) => (
                            <div key={day} className="mb-6 flex gap-10">
                                <p className="font-inter font-semibold text-[18px] text-gray-900 leading-[150%] tracking-[0%] text-nowrap">{day}</p>

                                <div className='flex-1 max-w-[1058px] ml-auto'>
                                    {tasks.map((task, idx) => {
                                        const key = `${day}-${idx}`;
                                        return (
                                            <div
                                                key={idx}
                                                className="flex items-center justify-between border border-gray-200 rounded-lg p-3 mb-2"
                                            >
                                                <span className="font-inter font-medium text-[16px] leading-[150%] tracking-[0%] text-gray-900">{task.title}</span>
                                                <div className="flex items-center gap-4">
                                                    <span className="font-inter font-normal text-[14px] leading-[125%] tracking-[0%] text-gray-400">{task.hours}</span>
                                                    <span className="text-sm font-medium text-blue-800 px-3 py-1 rounded-md bg-blue-100">
                                                        {task.project}
                                                    </span>
                                                    <button
                                                        ref={(el) => {
                                                            buttonRefs.current[key] = el;
                                                        }}
                                                        className="text-gray-500 hover:text-gray-700 hover:cursor-pointer"
                                                        onClick={() => handleMenuToggle(day, idx)}
                                                    >
                                                        ⋯
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    })}
                                    <button className="w-full font-medium text-[16px] text-gray-500 leading-[150%] align-middle font-inter py-3 border border-dashed border-gray-300 hover:text-blue-700 rounded-lg hover:bg-blue-100 hover:border-blue-700 hover:cursor-pointer transition">
                                        + Add new task
                                    </button>
                                    {openMenu && <Dropdown />}
                                </div>
                            </div>
                        ))
                    )}
                </Card>

            </div>

            <Card>
                <p className="font-inter font-normal text-center text-gray-500 text-sm leading-[21px] tracking-normal my-1">
                    © 2024 tentwenty. All rights reserved.
                </p>
            </Card>

        </MainLayout>
    )
}

export default Week