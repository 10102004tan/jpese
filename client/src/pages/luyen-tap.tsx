import SecondLayout from '@/layouts/second'
import { Header } from "@/components/header";
import Sidebar from "@/components/sidebar";
import { Avatar, Button } from "@heroui/react";
import { AlignJustify, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Coffee, LogOut, MoreHorizontal, X } from "lucide-react";
import thumbnail from "@/assets/images/thumbnail.png";
import Markdown from 'react-markdown'
import parse, { domToReact, HTMLReactParserOptions } from "html-react-parser";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const LuyenTapPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [nguPhap, setNguPhap] = useState<any[]>([])
  const [currentContent, setCurrentContent] = useState<number>(0);
  const [isOpenPractice, setIsOpenPractice] = useState(false);
  const [isOpenListQuestion, setIsOpenListQuestion] = useState(false);
  const [baiTap, setBaiTap] = useState<any[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<number>(0)
  
  // <Route element={<LuyenTapPage />} path="/luyen-tap/:slug" />
  const { slug } = useParams<{ slug: string }>();

  const options: HTMLReactParserOptions = {
    replace: (domNode: any) => {
      if (domNode.attribs) {
        console.log(domNode.attribs)
        delete domNode.attribs.style;
        delete domNode.attribs.class;
        delete domNode.attribs.id;
        delete domNode.attribs.width;
        delete domNode.attribs.height;
        delete domNode.attribs.alt;
        delete domNode.attribs.title;
        delete domNode.attribs.align;
      }

      // if image
      if (domNode.name === 'img') {
        // src = "https://www.vnjpclub.com"+src
        const src = "https://www.vnjpclub.com/" + domNode.attribs.src 
        return <img src={src} alt="image" className="w-full h-full object-cover rounded-lg" />
      }
    }
  }



  const getNguPhap = async () => {
    const res = await fetch(`http://localhost:3000/api/minna-no-nihongo/${slug}`)
    const data = await res.json()
    setNguPhap(data.nguPhap)
    setBaiTap(data.baiTap)
  }

  useEffect(() => {
    getNguPhap()
  }, []);


  return (
    <SecondLayout>
      <div className={`w-96 h-screen bg-white shadow-sm shadow-gray-500 fixed left-0 top-16 p-4 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/*  */}
        <Button onPress={() => setIsSidebarOpen(!isSidebarOpen)} className="bg-transparent text-blue-500 font-semibold">
          <X size={16} />
          Ẩn danh sách bài học
        </Button>

        {/* content */}
        <div className="mt-4">
          <h4 className="text-lg font-semibold">
            Bài 26
          </h4>
          <span className="text-sm text-gray-500">Đã hoàn thành 1/10 bài học</span>

          <ul className="mt-4 space-y-2">
            {
              nguPhap.map((item: any, index: number) => (
                <li onClick={() => setCurrentContent(index)} key={item.id} className={`p-3 ${currentContent === index ? 'bg-blue-500 text-white' : 'bg-[#EBF5FF] text-blue-500'} rounded-lg cursor-pointer font-semibold`}>
                  <h4 className="mb-2">{item.title}</h4>
                  <div className="flex gap-1 ms-3">
                    <Coffee size={16} className='text-yellow-600' />
                  </div>
                </li>
              ))
            }
          </ul>

          <p className="mt-4 text-sm text-gray-500">
            Bạn có thể làm bài nhiều lần. Điểm số sẽ được ghi nhật ở lần làm bài tốt nhất
          </p>
        </div>
      </div>
      <div className={`w-full bg-white p-6 transition-transform duration-500 ${isSidebarOpen ? 'ml-96' : 'ml-0'}`}>
        {/* breadcrumb */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            {
              !isSidebarOpen && (
                <Button onPress={() => setIsSidebarOpen(!isSidebarOpen)} className="bg-transparent text-blue-500 font-semibold">
                  <AlignJustify size={16} />
                  Danh sách bài học
                </Button>
              )
            }
            <span className="font-semibold">Bài 26</span>
            <ChevronRight size={16} />
            <span>Giới thiệu về khóa học</span>
          </div>

          {/* prev and next */}
          <div className="flex items-center gap-2">
            <Button className="bg-transparent text-blue-500 font-semibold">
              <ChevronLeft size={16} />
              Bài trước
            </Button>
            <Button className="bg-transparent text-blue-500 font-semibold">
              Bài tiếp
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>

        {/* content */}
        <div className="grid h-[calc(100vh-10rem)] grid-rows-12 gap-4">
          <div className="row-span-11 w-full overflow-y-auto rounded-lg">
            <div className="w-full h-full rounded-lg overflow-hidden">
              <img src={thumbnail} alt="thumbnail" className="w-full h-full object-cover rounded-lg" />
            </div>
            {/* content */}
            <div className="p-4">
              {
                nguPhap && nguPhap[currentContent] && (
                  parse(nguPhap[currentContent]?.content, options)
                )
              }
            </div>
          </div>
          {/* bar */}
          <div className="row-span-1 w-full text-center">
            <Button onPress={() => setIsOpenPractice(!isOpenPractice)} className="bg-blue-500 text-white font-semibold">
              Bắt đầu làm bài tập
            </Button>
          </div>
        </div>
      </div>

      <div className={`w-full h-screen fixed top-0 left-0 right-0 bottom-0 bg-white p-6 transition-transform duration-500 z-50 ${isOpenPractice ? 'translate-y-0' : 'translate-y-full'}`}>
        {/* header */}
        <div className="flex items-center p-3 border-b border-gray-200">
          <Button onPress={() => setIsOpenPractice(!isOpenPractice)} className="bg-transparent text-blue-500 font-semibold">
            <X size={16} />
            Thoát
          </Button>
        </div>

        {/* content */}
        <div>
              {
                baiTap && baiTap[currentQuestion] && (
                  parse(baiTap[currentQuestion]?.content, options) 
                )
              }
        </div>

        {/* list question */}
        <div className='absolute bottom-0 left-0 right-0 px-2 py-5 border-t border-gray-200 bg-white'>
          <div className='flex items-center gap-2 cursor-pointer' onClick={() => setIsOpenListQuestion(!isOpenListQuestion)}>
            <div className='p-1 rounded-full bg-black text-white'>
              {
                isOpenListQuestion ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )
              }
            </div>
            <h4 className='mb-2 font-semibold'>Danh sách Exercise</h4>
          </div>
          <div className={`w-full overflow-y-auto flex items-center gap-2 ${isOpenListQuestion ? 'max-h-[300px]' : 'max-h-0'} transition-all duration-300`}>
            {
              baiTap.map((_,index: number) => (
                <a onClick={() => setCurrentQuestion(index)} className='w-[40px] h-[40px] text-center rounded-full bg-blue-500 text-white border-2 border-white flex items-center justify-center'>
                  {index + 1}
                </a>
              ))
            }
          </div>
        </div>
      </div>
    </SecondLayout>
  )
}

export default LuyenTapPage
