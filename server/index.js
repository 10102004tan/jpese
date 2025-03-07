const express = require("express");
const axios = require("axios");
const puppeteer = require("puppeteer");
const cors = require("cors");

const app = express();
const PORT = 3000;

const rootUrl = "https://www.vnjpclub.com";

// cors for http://localhost:5173/
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.get("/api/minna-no-nihongo", async (req, res) => {
    try {
        const url = "https://www.vnjpclub.com/minna-no-nihongo/";
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.goto(url, { waitUntil: "networkidle2" });

        // Lấy HTML sau khi trang được render hoàn chỉnh
        const content = await page.content();
        await browser.close();

        const cheerio = require("cheerio");
        const $ = cheerio.load(content);

        const listTitles = [];

        $(".list-title a").each((index, element) => {
            listTitles.push({
                title: $(element).text().trim(),
                href: $(element).attr("href")
            });
        });

        res.json({
            listTitles: listTitles
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Lỗi khi lấy nội dung từ trang web" });
    }
});

app.get("/api/minna-no-nihongo/tu-vung/:lesson", async (req, res) => {
    try {
        const { lesson } = req.params;
        const url = `https://www.vnjpclub.com/minna-no-nihongo/bai-${lesson}-tu-vung.html`;
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.goto(url, { waitUntil: "networkidle2" });

        // Lấy HTML sau khi trang được render hoàn chỉnh
        const content = await page.content();
        await browser.close();

        const cheerio = require("cheerio");
        const $ = cheerio.load(content);

        const listVocabulary = [];
        $("tr").each((index, element) => {
            if (index === 0) {
                return;
            }
            const td = $(element).find("td");
            if (td.length === 5) {
                const tuVung = $(td[0]).text().trim();
                const hanTu = $(td[1]).text().trim();
                const amHan = $(td[2]).text().trim();
                const audio = $(td[3]).find("audio").attr("src") ? rootUrl + $(td[3]).find("audio").attr("src") : "";
                const nghia = $(td[4]).text().trim();

                listVocabulary.push({
                    tuVung,
                    hanTu,
                    amHan,
                    audio,
                    nghia
                });
            } else if (td.length === 3) {
                const tuVung = $(td[0]).text().trim();
                const hanTu = "";
                const amHan = "";
                const audio = $(td[1]).find("audio").attr("src") ? rootUrl + $(td[1]).find("audio").attr("src") : "";
                const nghia = $(td[2]).text().trim();

                listVocabulary.push({
                    tuVung,
                    hanTu,
                    amHan,
                    audio,
                    nghia
                });
            } else if (td.length === 2) {
                const tuVung = $(td[0]).text().trim();
                const hanTu = "";
                const amHan = "";
                const audio = "";
                const nghia = $(td[1]).text().trim();

                listVocabulary.push({
                    tuVung,
                    hanTu,
                    amHan,
                    audio,
                    nghia
                });
            }
        });

        res.json({
            listVocabulary: listVocabulary
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Lỗi khi lấy nội dung từ trang web" });
    }
});

app.get("/api/minna-no-nihongo/:slug", async (req, res) => {
    try {
        const { slug } = req.params;
        const url = `https://www.vnjpclub.com/minna-no-nihongo/${slug}.html`;
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.goto(url, { waitUntil: "networkidle2" });

        const content = await page.content();
        await browser.close();

        const cheerio = require("cheerio");
        const $ = cheerio.load(content);



        const nguPhap = [];
        const baiTap = [];

        // Lấy danh sách các tab
        const tabs = $(".tab_content").map((index, element) => {
            return $(element).html().trim();
        }).get();  // Chuyển thành mảng

        if (tabs.length > 0) {
            const $tabNguPhap = cheerio.load(tabs[0]);
            const slidesNguPhap = $tabNguPhap(".slide").get();

            slidesNguPhap.forEach(slide => {
                const $ = cheerio.load(slide);
                const title = $(".slide-title").text().trim();
                const content = $(".slide-content").html()?.trim() || "";

                nguPhap.push({
                    title,
                    content
                });
            });
        }

        if (tabs.length > 1) {
            const $tabBaiTap = cheerio.load(tabs[1]);
            const slidesBaiTap = $tabBaiTap(".slide").get();

            slidesBaiTap.forEach(slide => {
                const $ = cheerio.load(slide);
                const title = $(".slide-title").text().trim();
                const content = $(".slide-content").html()?.trim() || "";
                const dapAn = $(".slide-content .sl2").html()?.trim() || "";

                baiTap.push({
                    title,
                    content,
                    dapAn
                });
            });
        }

        res.json({
            nguPhap: nguPhap,
            baiTap: baiTap
        });




    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Lỗi khi lấy nội dung từ trang web" });
    }
});

/*
[
    {
        id:1,
        buoi:1,
        status: "done",
        date: "2025-03-06",
        year:2025,
        month:"Tháng 3",
        lesson:[
            {
                id:1,
                title:"Từ vựng bài 26",
                status: "done",
                slug:"bai-1-tu-vung",
            },
            {
                id:2,
                title:"Ngữ pháp bài 26",
                status: "done",
                slug:"bai-1-ngu-phap",
            }
        ]
    }
]

*/

app.post("/api/minna-no-nihongo/:course", async (req, res) => {
    let currentLesson = 26;
    const course = req.params.course;
    // get startDate from body
    const startDate = req.body?.startDate || '2025-03-07';
    if (course === "n4"){
        // get count day of month
        const date = new Date(startDate);
        const lastDayOfMonth = new Date(date.getFullYear(),date.getMonth()+1,0).getDate();
        // get number month
        const result = [];
        const data = [];
        for (let i = date.getDate(); i < lastDayOfMonth; i++) {
            const buoi = i - date.getDate() + 1;
            const lessons = [];
            if (i % 2 !== 0){
                lessons.push({
                    id:i,
                    title:`Từ vựng bài ${currentLesson}`,
                    status: "done",
                    slug:`bai-${currentLesson}-tu-vung`,
                });
                lessons.push({
                    id:i,
                    title:`Ngữ pháp bài ${currentLesson}`,
                    status: "done",
                    slug:`bai-${currentLesson}-ngu-phap`,
                });
            }else{
                lessons.push({
                    id:i,
                    title:`Nghe hiểu ${currentLesson}`,
                    status: "done",
                    slug:`bai-${currentLesson}-nghe-hieu`,
                });
                lessons.push({
                    id:i,
                    title:`Đọc hiểu ${currentLesson}`,
                    status: "done",
                    slug:`bai-${currentLesson}-doc-hieu`,
                });
                lessons.push({
                    id:i,
                    title:`Hán tự ${currentLesson}`,
                    status: "done",
                    slug:`bai-${currentLesson}-han-tu`,
                });
                currentLesson++;
            }
            data.push({
                id:i,
                buoi,
                status: "done",
                date:new Date(date.getFullYear(),date.getMonth(),i).toISOString().split('T')[0],
                lessons:lessons
            });
        }
        result.push({
            id:1,
            year:date.getFullYear(),
            month:date.getMonth() + 1,
            data:data
        })

        // next month
        const nextMonth = new Date(date.getFullYear(),date.getMonth()+1,0).getDate();
        const nextMonthData = [];
        for (let i = 1; i <= nextMonth; i++) {
            if (currentLesson > 50){
                break;
            }
            const lessons = [];
            if (i % 2 !== 0){
                lessons.push({
                    id:i,
                    title:`Từ vựng bài ${currentLesson}`,
                    status: "done",
                    slug:`bai-${currentLesson}-tu-vung`,
                })
                lessons.push({
                    id:i,
                    title:`Ngữ pháp bài ${currentLesson}`,
                    status: "done",
                    slug:`bai-${currentLesson}-ngu-phap`,
                })
            }else{
                lessons.push({
                    id:i,
                    title:`Nghe hiểu bài ${currentLesson}`,
                    status: "done",
                    slug:`bai-${currentLesson}-nghe-hieu`,
                })
                lessons.push({
                    id:i,
                    title:`Đọc hiểu bài ${currentLesson}`,
                    status: "done",
                    slug:`bai-${currentLesson}-doc-hieu`,
                })
                lessons.push({
                    id:i,
                    title:`Hán tự bài ${currentLesson}`,
                    status: "done",
                    slug:`bai-${currentLesson}-han-tu`,
                })
                currentLesson++;
            }
            nextMonthData.push({
                id:i,
                buoi:i,
                status: "done",
                date:new Date(date.getFullYear(),date.getMonth()+1,i).toISOString().split('T')[0],
                lessons:lessons
            })
        }
        result.push({
            id:2,
            year:date.getFullYear(),
            month:date.getMonth() + 2,
            data:nextMonthData
        })

        res.json({
            result
        })
    }
});


app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});