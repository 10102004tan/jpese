import Calendar from "@/components/calendar"
import DefaultLayout from "@/layouts/default"
import { Button } from "@heroui/button"
import { ArrowRight, Clock, Coffee, Info, SquareChartGantt } from "lucide-react"
import Lottie from "lottie-react";
import animationData from "@/assets/lotties/cute.json";
import { useEffect, useState } from "react";

const StudyPlanPage = () => {
    const [course, setCourse] = useState<any[]>([]);
    useEffect(() => {
        getAllCourse().then((data) => {
            setCourse(data);
        });
    }, []);

    const getAllCourse = async () => {
        const response = await fetch("http://localhost:3000/api/minna-no-nihongo/n4",{
            method:'POST',
            body:JSON.stringify({
                startDate:'2025-02-04'
            })
        });
        const data = await response.json();
        return data.result;
    }
    return (
        <DefaultLayout>
            {/* right and left */}
            <div className="grid grid-cols-4 gap-3">
                <div className="lg:col-span-3 col-span-4">
                    <div className="flex items-center justify-between mb-3">
                        <div className="text-2xl flex items-center gap-2 font-semibold text-white">Chương trình bạn chọn
                            <Info size={16} />
                        </div>
                        {/* xem danh sach chang duong */}
                        <Button className="bg-transparent border px-2 py-4 rounded-lg text-white">
                            <SquareChartGantt size={18} />
                            Xem danh sách chặng đường
                        </Button>
                    </div>
                        <Calendar course={course}/>
                </div>
                <div className="col-span-1">
                    {/* tien do hoc */}
                    <div className="p-2 rounded-lg bg-white mb-3">
                        {/*header */}
                        <p className="text-lg text-black font-semibold">
                            Tiến độ học
                        </p>
                        {/* ul */}
                        <ul className="flex flex-col gap-2 text-xs">
                            <li className="flex items-center gap-2 border-b border-gray-50 justify-between py-2 text-white">
                                <span className="text-black font-semibold">
                                    So ngay con lai
                                </span>
                                <span className="text-gray-500">4/22 ngay</span>
                            </li>
                            <li className="flex items-center gap-2 border-b border-gray-50 justify-between py-2 text-white">
                                <span className="text-black font-semibold">
                                    So cup dat duoc
                                </span>
                                <div className="text-gray-500 flex items-center gap-2">
                                    <Coffee size={16} />
                                    <span>57/108</span>
                                </div>
                            </li>
                            <li className="flex items-center gap-2 border-b border-gray-50 justify-between py-2 text-white">
                                <p>
                                    Ban dang hoc cham hon ke hoach. Phai co gang hon nua de dat muc tieu day!
                                </p>
                            </li>
                            <li className="flex items-center gap-2 border-b border-gray-50 justify-between py-2 text-white">
                                <Button className="flex gap-2 items-center w-full">
                                    <Clock size={16} />
                                    <p>
                                        Bạn có <span className="font-semibold text-red-500">10</span> chưa hoàn thành
                                    </p>
                                    <ArrowRight size={16} />
                                </Button>
                            </li>
                        </ul>
                    </div>

                    {/* loi nhac */}
                    <div>
                        <p className="text-md py-2 px-3 text-white rounded-lg font-semibold bg-[#eeeeeea8]">
                            Ui không, hôm nay bạn phải cố gắng hoàn thành nào
                        </p>
                        <Lottie  animationData={animationData} loop={true} />
                    </div>
                </div>
            </div>
        </DefaultLayout>
    )
}

export default StudyPlanPage
