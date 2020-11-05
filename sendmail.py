#! /usr/bin/env python
#coding=utf-8

from email.mime.text import MIMEText
from email.header import Header
from smtplib import SMTP_SSL


#qq邮箱smtp服务器
host_server = 'smtp.qq.com'
#sender_qq为发件人的qq号码,改成自己的邮箱
sender_qq = '2********@qq.com'
#pwd为qq邮箱的授权码,改成自己的邮箱授权码
pwd = 'a*********i' ## xh**********bdc
#发件人的邮箱
sender_qq_mail = '2********@qq.com'
#收件人邮箱
receiver = 'l********@gmail.com'

#邮件的正文内容
mail_content = '健康每日报发完了,赶紧检查下它干没干活吧'
#邮件标题
mail_title = 'Android 小机器人 的邮件'
print("邮件已发送")

#ssl登录
smtp = SMTP_SSL(host_server)
#set_debuglevel()是用来调试的。参数值为1表示开启调试模式，参数值为0关闭调试模式
smtp.set_debuglevel(0)
smtp.ehlo(host_server)
smtp.login(sender_qq, pwd)

msg = MIMEText(mail_content, "plain", 'utf-8')
msg["Subject"] = Header(mail_title, 'utf-8')
msg["From"] = sender_qq_mail
msg["To"] = receiver
smtp.sendmail(sender_qq_mail, receiver, msg.as_string())
smtp.quit()


