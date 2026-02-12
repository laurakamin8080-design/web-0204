from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pymysql

app = FastAPI()

# 리액트(Frontend)와 통신을 허용하는 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# 데이터베이스 연결 함수 (각각의 DB 이름에 따라 연결)
def get_db(db_name):
    return pymysql.connect(
        host='localhost',
        user='root',
        password='1234',  # 작가님 비밀번호가 다르면 수정하세요!
        db=db_name,
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor
    )

# --- 1. [기존] 팀 소개 & 방명록 관련 기능 ---
@app.get("/api/team")
def get_team():
    conn = get_db('team_introduction')
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM team")
            return cur.fetchall()
    finally:
        conn.close()

# --- 2. [신규] 수강 신청 시스템 관련 기능 ---

# 강의 목록 불러오기 (실시간 신청 인원 포함)
@app.get("/api/courses")
def get_courses():
    conn = get_db('school_system')
    try:
        with conn.cursor() as cur:
            # 서브쿼리를 사용해 실시간으로 enrollments 테이블의 숫자를 셉니다.
            sql = """
            SELECT c.*, 
            (SELECT COUNT(*) FROM enrollments e WHERE e.course_id = c.id) as current_students 
            FROM courses c
            """
            cur.execute(sql)
            return cur.fetchall()
    finally:
        conn.close()

# 학생 목록 불러오기
@app.get("/api/students")
def get_students():
    conn = get_db('school_system')
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM students")
            return cur.fetchall()
    finally:
        conn.close()

# [수강 신청] 기능
@app.post("/api/enroll")
async def enroll(data: dict):
    conn = get_db('school_system')
    try:
        with conn.cursor() as cur:
            # 1. 먼저 현재 신청 인원 확인
            cur.execute("SELECT COUNT(*) as count FROM enrollments WHERE course_id = %s", (data['course_id'],))
            current_count = cur.fetchone()['count']
            
            # 2. 최대 인원 확인
            cur.execute("SELECT max_students FROM courses WHERE id = %s", (data['course_id'],))
            max_limit = cur.fetchone()['max_students']
            
            # 3. 정원 초과 체크
            if current_count >= max_limit:
                return {"message": "정원이 초과되었습니다!"}
            
            # 4. 신청 기록 저장
            cur.execute("INSERT INTO enrollments (student_id, course_id) VALUES (%s, %s)", 
                        (data['student_id'], data['course_id']))
            conn.commit()
            return {"message": "수강 신청 성공!"}
    finally:
        conn.close()

# [수강 취소] 기능
@app.post("/api/cancel")
async def cancel_enroll(data: dict):
    conn = get_db('school_system')
    try:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM enrollments WHERE student_id = %s AND course_id = %s",
                        (data['student_id'], data['course_id']))
            conn.commit()
            return {"message": "취소 완료!"}
    finally:
        conn.close()

# [나의 수강 내역] 불러오기
@app.get("/api/my-courses/{student_id}")
def get_my_courses(student_id: int):
    conn = get_db('school_system')
    try:
        with conn.cursor() as cur:
            sql = """
            SELECT c.* FROM courses c
            JOIN enrollments e ON c.id = e.course_id
            WHERE e.student_id = %s
            """
            cur.execute(sql, (student_id,))
            return cur.fetchall()
    finally:
        conn.close()

if __name__ == "__main__":
    import uvicorn
    # 서버 실행 (포트 8000), 코드 변경 시 자동 재시작(reload=True)
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
