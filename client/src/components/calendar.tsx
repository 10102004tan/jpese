import { Button } from '@heroui/button'
import { Anchor, CalendarDays, CircleCheck, Coffee, LayoutGrid, List } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const LessionItem = ({ item }: { item: any }) => {
    console.log("item::",item)
    return (
        <div className={`border-2 h-full ${item.status === 'completed' ? 'border-green-500 bg-[#F0FDF4]' : item.status === 'in-progress' ? 'border-yellow-500 bg-[#FEFCE8]' : 'border-blue-500 bg-[#EFF8FF]'} p-3 rounded-xl text-sm`}>
            <div className='flex items-center justify-between mb-2'>
                <div className={`flex items-center gap-2 text-white ${item.status === 'completed' ? 'bg-green-500' : item.status === 'in-progress' ? 'bg-yellow-500' : 'bg-blue-500'} rounded-full p-1`}>
                    <span className='font-semibold'>Buổi {item.buoi}</span>
                    <CircleCheck size={16} />
                </div>
                <div className='flex items-center gap-2'>
                    <Coffee size={16} className='text-yellow-500' />
                    <span className='font-semibold text-gray-500'>57/108</span>
                </div>
            </div>

            {/* ul list */}
            <ul className='flex flex-col gap-2 mb-2'>
                {
                    item.lessons.map((item: any) => (
                        <li className='relative flex items-center gap-2 text-xs'>
                            <div className={`${item.status === 'completed' ? 'bg-green-500' : item.status === 'in-progress' ? 'bg-yellow-500' : 'bg-blue-500'} rounded-full w-2 h-2`}></div>
                            <Link to={`/luyen-tap/${item.slug}`}>
                            {item.title}
                            </Link>
                        </li>
                    ))
                }
            </ul>
            {/* status , bottom*/}
           {
            item.status === 'completed' && (
                <p className="text-green-500 text-xs justify-end">Đã hoàn thành vào: Thứ Ba, 18 Tháng 2</p>
            )
           }
        </div>
    )
}

const CalendarItem = ({ item,currentDate }: { item: any,currentDate:string | null }) => {
    const todayRef = useRef<null | HTMLDivElement>(null);
    useEffect(() => {
        console.log(todayRef.current);
        if (todayRef.current) {
          todayRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, [currentDate]);

    return (
        <div className='pb-3 pt-2 border-b border-gray-200'>
            <h5 className='text-center font-semibold text-gray-500 mb-3'>{item.month} {item.year}</h5>
            {/* list day */}
            <div className='grid lg:grid-cols-3 md:grid-cols-1 gap-1'>
                {
                    item.data.map((item: any) => (
                        <div className='relative' ref={item.date === currentDate ? todayRef : null} key={item.id}>
                            <LessionItem key={item.id} item={item} />
                            {
                                item.date === currentDate && (
                                    <div className='absolute bottom-0 right-0 border bg-yellow-500 rounded-full p-2'>
                                        <Anchor className='text-black rounded-full' size={16} />
                                    </div>
                                )
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

const Calendar = ({course}:{course:any}) => {
    const [currentDate,setCurrentDate] = useState<string | null>(new Date().toISOString().split("T")[0]);
    return (
        <div className='w-full p-3 rounded-lg bg-white'>
            {/* tabs */}
            <div className='flex items-center justify-between pb-2'>
                <Button onPress={() => {
                    setCurrentDate(null); // 🟢 Đặt lại null trước
                    setTimeout(() => {
                      setCurrentDate(new Date().toISOString().split("T")[0]); // 🟢 Cập nhật lại ngày hôm nay
                    }, 0);
                }} className='bg-transparent border px-2 py-4 rounded-lg text-black'>
                    Hôm nay
                </Button>

                {/* layout date */}
                <div className='flex items-center gap-2 p-2 rounded-lg bg-gray-100'>
                    <CalendarDays className='cursor-pointer' size={16} />
                    <LayoutGrid className='cursor-pointer' size={16} />
                    <List className='cursor-pointer' size={16} />
                </div>
            </div>

            {/* calendar */}
            <div className='w-full overflow-y-auto max-h-[calc(100vh-15rem)]'>
                {
                    course.map((item:any) => (
                        <CalendarItem currentDate={currentDate} key={item.id} item={item} />
                    ))
                }
            </div>
        </div>
    )
}

export default Calendar
