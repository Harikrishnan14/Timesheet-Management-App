import Card from "@/components/Card";
import MainLayout from "@/components/MainLayout";
import { TimesheetWeek } from "@/interfaces/next-auth";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";

interface Props {
  timesheetData: TimesheetWeek[];
}

export default function Home({ timesheetData }: Props) {
  const router = useRouter()

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      case 'INCOMPLETE':
        return 'bg-yellow-100 text-yellow-800';
      case 'MISSING':
        return 'bg-pink-100 text-pink-800';
      default:
        return '';
    }
  };

  return (
    <MainLayout>

      <div className="mb-6">
        <Card>
          <h3 className="font-inter font-bold text-2xl leading-[24px] tracking-normal mb-8">Your Timesheets</h3>

          <div className="overflow-hidden rounded-lg shadow">
            <table className="min-w-full text-left text-sm text-gray-600 border-collapse">
              <thead className="bg-gray-50">
                <tr className="font-semibold text-[12px] text-gray-500 leading-[150%] uppercase">
                  <th className="p-5">WEEK #</th>
                  <th className="p-5">DATE</th>
                  <th className="p-5">STATUS</th>
                  <th className="p-5">ACTIONS</th>
                </tr>
              </thead>

              <tbody>
                {timesheetData.map((row, index) => (
                  <tr
                    key={index.toString()}
                    className="bg-white text-[#111827] text-[14px] font-normal leading-[21px] border border-[#E5E7EB] rounded-[8px] shadow-sm"
                  >
                    <td className="p-5 bg-gray-50 w-[107px] font-normal text-[14px] leading-[150%] text-gray-900">{row.week}</td>
                    <td className="p-5 font-inter font-normal text-[14px] leading-[150%] text-gray-500">{row.date}</td>
                    <td className="p-5">
                      <span
                        className={`px-2 py-1 rounded-md text-[12px] font-medium ${getStatusStyles(row.status)}`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        className="font-normal text-blue-600 text-base leading-[125%] font-inter hover:cursor-pointer hover:text-blue-400"
                        onClick={() => router.push(`/timesheets/${row.week}`)}
                      >
                        {row.status === "COMPLETED"
                          ? "View"
                          : row.status === "INCOMPLETE"
                            ? "Update"
                            : "Create"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </Card>
      </div>

      <Card>
        <p className="font-inter font-normal text-center text-gray-500 text-sm leading-[21px] tracking-normal my-1">
          © 2024 tentwenty. All rights reserved.
        </p>
      </Card>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const response = await fetch(`https://timesheet-management-app-three.vercel.app/api/timesheets/getallweeks`);
  const json = await response.json();
  return {
    props: {
      timesheetData: json
    }
  };
}
