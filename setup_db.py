import pymysql

def setup_db():
    password = '1234' # User's password from main.py
    try:
        # Connect without DB to create it
        conn = pymysql.connect(host='localhost', user='root', password=password)
        with conn.cursor() as cur:
            cur.execute("CREATE DATABASE IF NOT EXISTS school_system")
            cur.execute("CREATE DATABASE IF NOT EXISTS team_introduction")
        conn.close()

        # Connect to school_system
        conn = pymysql.connect(host='localhost', user='root', password=password, db='school_system')
        with conn.cursor() as cur:
            cur.execute("""
                CREATE TABLE IF NOT EXISTS courses (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    title VARCHAR(255) NOT NULL,
                    instructor VARCHAR(100),
                    max_students INT NOT NULL,
                    category VARCHAR(100),
                    emoji VARCHAR(50)
                )
            """)
            cur.execute("""
                CREATE TABLE IF NOT EXISTS enrollments (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    student_id INT NOT NULL,
                    course_id INT NOT NULL,
                    UNIQUE KEY (student_id, course_id)
                )
            """)
            # Reset and insert sample data
            cur.execute("TRUNCATE TABLE courses") 
            cur.execute("INSERT INTO courses (title, instructor, max_students, category, emoji) VALUES (%s, %s, %s, %s, %s)", ('반전의 미학: 서스펜스 마스터 클래스', '바비', 20, '플롯', '🕵️‍♂️'))
            cur.execute("INSERT INTO courses (title, instructor, max_students, category, emoji) VALUES (%s, %s, %s, %s, %s)", ('살아 숨쉬는 입체적 인물 만들기', '멍코', 15, '캐릭터', '🎭'))
            cur.execute("INSERT INTO courses (title, instructor, max_students, category, emoji) VALUES (%s, %s, %s, %s, %s)", ('독자를 사로잡는 첫 문장의 비밀', '냐옹', 10, '문장', '✍️'))
            cur.execute("INSERT INTO courses (title, instructor, max_students, category, emoji) VALUES (%s, %s, %s, %s, %s)", ('판타지 세계관 A to Z', '햄찌', 25, '세계관', '🌍'))
            
            cur.execute("""
                CREATE TABLE IF NOT EXISTS students (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(100) NOT NULL
                )
            """)
            cur.execute("SELECT COUNT(*) as count FROM students")
            if cur.fetchone()['count'] == 0:
                cur.execute("INSERT INTO students (name) VALUES (%s)", ('테스트학생',))
        conn.commit()
        conn.close()

        # Connect to team_introduction
        conn = pymysql.connect(host='localhost', user='root', password=password, db='team_introduction')
        with conn.cursor() as cur:
            cur.execute("""
                CREATE TABLE IF NOT EXISTS team (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(100),
                    role VARCHAR(100),
                    emoji VARCHAR(50),
                    mbti VARCHAR(10),
                    hobby VARCHAR(255),
                    strength VARCHAR(255),
                    description TEXT
                )
            """)
            cur.execute("SELECT COUNT(*) as count FROM team")
            if cur.fetchone()['count'] == 0:
                cur.execute("INSERT INTO team (name, role, emoji, mbti, hobby, strength, description) VALUES (%s, %s, %s, %s, %s, %s, %s)", ('토끼', 'CEO', '🐰', 'ENFJ', '새로운 카페 투어', '트렌드 읽기', '팀을 이끄는 귀여운 리더'))
                cur.execute("INSERT INTO team (name, role, emoji, mbti, hobby, strength, description) VALUES (%s, %s, %s, %s, %s, %s, %s)", ('강아지', 'CTO', '🐶', 'ESTP', '산책하며 아이디어 구상', '무한 긍정', '열정 가득한 기술 책임자'))
                cur.execute("INSERT INTO team (name, role, emoji, mbti, hobby, strength, description) VALUES (%s, %s, %s, %s, %s, %s, %s)", ('고양이', 'Designer', '🐱', 'INTP', '햇볕 아래 낮잠', '논리적 분석', '감각적인 비주얼 담당'))
                cur.execute("INSERT INTO team (name, role, emoji, mbti, hobby, strength, description) VALUES (%s, %s, %s, %s, %s, %s, %s)", ('햄스터', 'Developer', '🐹', 'ISTJ', '해바라기씨 맛집 탐방', '끈기', '꼼꼼한 코드 마스터'))
        conn.commit()
        conn.close()
        print("Database setup complete!")
    except Exception as e:
        print(f"Error during setup: {e}")

if __name__ == "__main__":
    setup_db()
