const puppeteer = require('puppeteer');

(async () => {
    let width = 1200;
    let height = 960;
    //完全信任网站的时候可以取消沙盒,定义游览器的时候要定义长宽
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox', `--window-size=${width},${height}`] });
    const page = await browser.newPage();
    //定义页面的时候也要定义宽高,不然元素显示可能错位
    await page.setViewport({
        width: 1200,
        height: 960,
    });
    //进健康日报网站
    await page.goto('http://jkrb.xjtu.edu.cn');
    await page.screenshot({
        path: '1.png'
    });
    //!!!!使用前需按个人情况更改!!!!
    //填写登录界面的表单,此注释下一行括号中最后一个字符串是学号,此注释下两行货号中最后一个字符串是密码
    await page.type('#form1 > input.username', '312030****');
    await page.type('#form1 > input.pwd', 'L*******4');
    await page.screenshot({
        path: '2.png'
    });
    //点击登录按钮,直到没有新增网络流量停止,截图
    let enter_btn = await page.$('#account_login');
    // await enter_btn.click();
    await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
        enter_btn.click()
    ]);
    await page.screenshot({
        path: '3.png'
    });
    //切换iframe到研究生每日健康状况填报栏目,点击,截图
    await page.waitForSelector('#mini-17\\$body\\$2 > iframe');
    const h10 = await page.$('#mini-17\\$body\\$2 > iframe');
    const f10 = await h10.contentFrame();
    const h11 = await f10.$('#ab0ab54c0e7048a7b583d5c1c8da7c06 > div > div.mini-panel-viewport > div.mini-panel-body > iframe');
    const f11 = await h11.contentFrame();
    await f11.waitForSelector('#form > div.service-wrap > div > ul.service-hall.hottest-services > li:nth-child(1) > div > a > div > div');
    const yjs_btn = await f11.$('#form > div.service-wrap > div > ul.service-hall.hottest-services > li:nth-child(1) > div > a > div > div');
    await yjs_btn.click({ delay: 300 });
    await page.screenshot({
        path: '4.png'
    });
    //切换iframe到每日健康填报栏目,点击,截图
    await page.waitForSelector('#mini-17\\$body\\$3 > iframe');
    const h20 = await page.$('#mini-17\\$body\\$3 > iframe');
    const f20 = await h20.contentFrame();
    await f20.waitForSelector('body > div > div.service-right-sidebar > div.service-entrance > ul > li:nth-child(1) > span.arrow-icon > img');
    const jkrb_btn = await f20.$('body > div > div.service-right-sidebar > div.service-entrance > ul > li:nth-child(1) > span.arrow-icon > img');
    await jkrb_btn.click({ delay: 1000 });
    await page.screenshot({
        path: '5.png'
    });

    // 弃用的代码,通过控制鼠标指针指向并点击的方式,切入栏目,由于网络延迟不确定,容易报错 
    // await page.waitForTimeout(2000);
    // await page.mouse.click(150, 300, { delay: 500 });
    // await page.waitForTimeout(2000);
    // await page.mouse.click(940, 190, { delay: 500 });
    // await page.waitForTimeout(12000);

    //切换iframe到表单中
    await page.waitForSelector('#mini-17\\$body\\$4 > iframe');
    const handle = await page.$('#mini-17\\$body\\$4 > iframe');
    const frame1 = await handle.contentFrame();
    await frame1.waitForSelector('#mini-14\\$body\\$2 > iframe');
    const handle2 = await frame1.$('#mini-14\\$body\\$2 > iframe');
    const frame2 = await handle2.contentFrame();
    await frame2.waitForSelector('#mini-2\\$ck\\$2');
    //点击标签为"绿码"的radiobutton,截图
    const green_btn = await frame2.$('#mini-2\\$ck\\$2');
    await green_btn.click({ delay: 300 });
    await page.screenshot({
        path: '6.png'
    });
    //点击标签为"是(是否取得西安一码通)"的radiobutton,截图
    await frame2.waitForSelector('#mini-3\\$ck\\$0');
    const yes_btn = await frame2.$('#mini-3\\$ck\\$0');
    await yes_btn.click({ delay: 300 });
    await page.screenshot({
        path: '7.png'
    });
    //点击标签为"已读"的radiobutton,截图
    await frame2.waitForSelector('#mini-4\\$ck\\$0');
    const read_btn = await frame2.$('#mini-4\\$ck\\$0');
    await read_btn.click({ delay: 350 });
    await page.screenshot({
        path: '8.png'
    });
    //!!!!使用前需按个人情况更改!!!!
    //填写标签为"学院"的edittext,内容输入为"软件学院",截图
    await frame2.waitForSelector('#SZXY\\$text');
    const academy_edt = await frame2.$('#SZXY\\$text');
    await academy_edt.click({ delay: 200 });
    await academy_edt.type('软件学院', { delay: 300 });
    await page.screenshot({
        path: '9.png'
    });
    //!!!!使用前需按个人情况更改!!!!
    //填写标签为"当日体温"的edittext,内容输入为"36.5",截图
    await frame2.waitForSelector('#BRTW\\$text');
    const temp_edt = await frame2.$('#BRTW\\$text');
    await temp_edt.click({ delay: 200 });
    await temp_edt.type('36.5', { delay: 300 });
    await page.screenshot({
        path: '10.png'
    });
    //点击"提交"按钮,截图
    await frame1.waitForSelector('#sendBtn');
    const send_btn = await frame1.$('#sendBtn');
    await send_btn.click({ delay: 400 });
    await page.screenshot({
        path: '11.png'
    });
    //确认提交,截图
    await frame1.waitForSelector('#mini-17');
    const submit_btn = await frame1.$('#mini-17');
    await submit_btn.click({ delay: 700 });
    await page.screenshot({
        path: '12.png'
    });
    await browser.close();

})();


