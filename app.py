from flask import Flask, render_template, send_from_directory
import datetime
import os

app = Flask(__name__)

# เพิ่มฟังก์ชัน jinja filters
# ไม่ใช้ filter แต่จะส่งปีปัจจุบันไปแสดงโดยตรง

@app.route('/')
def index():
    # ข้อมูลจาก Resume
    profile = {
        "name": "นนธพัฒน์ เอียดทอง",
        "name_en": "Nontapat Eiedtong",
        "title": "PENTESTER / SOFTWARE ENGINEER",
        "contact": {
            "address": "79/1 หมู่ 5 บ่อหิน สิเกา ตรัง",
            "address_en": "79/1, Moo 5, Bo Hin, Sikao, Trang",
            "email": "nontapat0467@gmail.com",
            "phone": "+66 65 403 2410"
        },
        "summary": "บัณฑิตสาขาระบบสารสนเทศทางธุรกิจที่มีประสบการณ์การพัฒนาเว็บและแอปพลิเคชันในบทบาทพนักงานประจำ พาร์ทไทม์ และฟรีแลนซ์ เชี่ยวชาญทั้งด้านวิศวกรรมซอฟต์แวร์และความปลอดภัยไซเบอร์ มีความชำนาญในการทดสอบการเจาะระบบ",
        "summary_en": "Business Information Systems graduate with extensive experience in web and application development across full-time, part-time, and freelance roles. Specialized in both software engineering and cybersecurity with demonstrated expertise in penetration testing."
    }
    
    education = {
        "degree": "ปริญญาตรี บริหารธุรกิจ (ระบบสารสนเทศทางธุรกิจ)",
        "degree_en": "Bachelor of Business Administration (Business Information Systems)",
        "university": "มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่",
        "university_en": "Prince of Songkla University, Hat Yai Campus",
        "faculty": "คณะวิทยาการจัดการ",
        "faculty_en": "Faculty of Management Sciences",
        "gpa": "GPA 3.05",
        "duration": "มิถุนายน 2564 - มีนาคม 2568",
        "duration_en": "June 2021 - March 2025"
    }
    
    experiences = [
        {
            "position": "Software Engineer",
            "type": "Full-Time",
            "company": "",
            "duration": "กุมภาพันธ์ 2568 - ปัจจุบัน",
            "duration_en": "February 2025 - Present",
            "responsibilities": [
                "พัฒนาระบบควบคุมคอนเวเยอร์ในโรงงานกระดาษ ด้วย React (TSX)",
                "พัฒนาระบบควบคุมหุ่นยนต์ร่วมกับ Yaskawa ด้วย React (TSX) และ Python"
            ],
            "responsibilities_en": [
                "Developed conveyor control systems for paper manufacturing facilities using React (TSX)",
                "Built robotic control systems in collaboration with Yaskawa using Full-stack React (TSX) and Python backend"
            ]
        },
        {
            "position": "Freelance Developer",
            "type": "QueenCoding",
            "company": "",
            "duration": "กุมภาพันธ์ 2567 - ปัจจุบัน",
            "duration_en": "February 2024 - Present",
            "responsibilities": [
                "พัฒนาเว็บไซต์แคมเปญรณรงค์งดบุหรี่ไฟฟ้า (www.soopburee.onrender.com) ด้วย HTML, CSS, JavaScript, และ Python",
                "พัฒนาแอปพลิเคชัน 'Healjai' สำหรับโรงเรียนสกลราชวิทยานุกูล (เผยแพร่บน Google Play Store)",
                "พัฒนาเว็บไซต์ E-Commerce สำหรับขายเสื้อผ้าและชุดนักเรียน"
            ],
            "responsibilities_en": [
                "Created anti-electronic cigarette campaign website (www.soopburee.onrender.com)",
                "Developed 'Healjai' application for Sakolrajwittayanukul School (published on Google Play Store)",
                "Built e-commerce platform for clothing and school uniform sales"
            ]
        },
        {
            "position": "Pentester",
            "type": "Freelance",
            "company": "",
            "duration": "พฤศจิกายน 2567 - มีนาคม 2568",
            "duration_en": "November 2024 - March 2025",
            "responsibilities": [
                "ตรวจหาช่องโหว่และทำการสแกนความปลอดภัยให้กับโรงพยาบาลและศูนย์แจ้งเหตุฉุกเฉิน",
                "เขียนรายงานผลการทดสอบความปลอดภัยตามมาตรฐานและความต้องการของผู้ว่าจ้าง"
            ],
            "responsibilities_en": [
                "Conducted vulnerability assessments and security scanning for hospitals and emergency response centers",
                "Prepared standardized security testing reports according to client requirements"
            ]
        },
        {
            "position": "Developer",
            "type": "Part-Time & Full-Time",
            "company": "",
            "duration": "กรกฎาคม 2567 - มกราคม 2568",
            "duration_en": "July 2024 - January 2025",
            "responsibilities": [
                "พัฒนาระบบจัดการคลังสินค้า (WMS) ด้วย React (TSX)",
                "พัฒนาเว็บไซต์อีคอมเมิร์ซด้วย WooCommerce (PHP) และปรับปรุงเป็นเวอร์ชัน 2 ด้วย Next.js (TSX)"
            ],
            "responsibilities_en": [
                "Engineered Warehouse Management System (WMS) using React (TSX)",
                "Developed e-commerce platforms with WooCommerce (PHP) and migrated to Next.js (TSX) for version 2"
            ]
        }
    ]
    
    skills = {
        "programming": ["Python", "PHP", "TypeScript/JavaScript", "HTML/CSS", "Kotlin"],
        "development": [
            "Frontend: React (TSX, JSX), Vue.js, และ Next.js",
            "Backend: Node.js, Flask, และ PHP",
            "Database: PostgreSQL, MySQL, MongoDB, และ Prisma",
            "Automation & Testing: Selenium",
            "Version Control: GitHub",
            "Project Management: Jira และ Trello"
        ],
        "cybersecurity": [
            "Operating Systems: Kali Linux และ Ubuntu",
            "Exploitation: SQL Injection และ MITM",
            "Attack Techniques: Brute Force และ Web Scraping",
            "Network Security: Wireshark",
            "Security Frameworks: Metasploit และ Camaredar"
        ],
        "tools": [
            "Cloud Services: Nipa Cloud",
            "Development Environments: Laragon, Xampp, และ Android Studio",
            "Containerization: Docker",
            "Database Services: Supabase, MariaDB, และ SQLite",
            "Deployment & Hosting: Vercel และ OnRender",
            "API Testing: Postman"
        ]
    }
    
            # เพิ่มปีปัจจุบันเข้าไปใน context
    current_year = datetime.datetime.now().year
    
    # เพิ่มข้อมูลโซเชียลมีเดีย
    social_media = {
        "github": "https://github.com/Mubmib1305",
        "facebook": "https://www.facebook.com/nontapat.eiedtong",
        "instagram": "https://www.instagram.com/_mubmib_/",
        "line": "Nontapat_46"
    }
    
    return render_template('index.html', 
                          profile=profile, 
                          education=education, 
                          experiences=experiences, 
                          skills=skills,
                          social_media=social_media,
                          current_year=current_year)
                          
@app.route('/download-resume')
def download_resume():
    # ส่งไฟล์ PDF จากโฟลเดอร์ pdf
    directory = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'pdf')
    return send_from_directory(directory, 'Resume - Nontapat Eiedtong.pdf', as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)