import datetime as dt
import time
import subprocess

if __name__ == "__main__":
    print('Good evening workman!')
    done = False
    while True:
        current_time = dt.datetime.now().time()
        print(current_time)
        if current_time.hour == 11 and done == False:
            # cmd0,cmd1 为当前系统下任意位置打开命令行运行脚本时所需的指令,下例为我的服务器上使用的脚本
            # 实现的功能是每天11点过后,10分钟以内运行脚本,运行完之后,用一个程控的邮箱给我另一个邮箱发邮件告诉我干完了
            cmd0 = 'cd /home/server/JianKangRibao_project; node jkrb.js'
            cmd1 = 'cd /home/server/JianKangRibao_project; python sendmail.py'
            p0 = subprocess.Popen(cmd0, shell=True)
            time.sleep(60)
            p1 = subprocess.Popen(cmd1,shell=True)
            time.sleep(60)
            p1.kill()
            time.sleep(8*60)
            p0.kill()
            done = True
        elif current_time.hour == 12:
            done = False
            time.sleep(10*60)
        else:
            time.sleep(10*60)

        
        
        