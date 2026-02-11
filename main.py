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

# 수강 신청하기
@app.post("/api/enroll")
async def enroll(data: dict):
    conn = get_db('school_system')
    try:
        with conn.cursor() as cur:
            try:
                cur.execute(
                    "INSERT INTO enrollments (student_id, course_id) VALUES (%s, %s)",
                    (data['student_id'], data['course_id'])
                )
                conn.commit()
                return {"message": "수강 신청 성공! 🎉"}
            except:
                raise HTTPException(status_code=400, detail="이미 신청한 강의입니다!")
    finally:
        conn.close()

# 수강 취소하기 (추가 요청하신 기능!)
@app.post("/api/unenroll")
async def unenroll(data: dict):
    conn = get_db('school_system')
    try:
        with conn.cursor() as cur:
            cur.execute(
                "DELETE FROM enrollments WHERE student_id = %s AND course_id = %s",
                (data['student_id'], data['course_id'])
            )
            conn.commit()
            return {"message": "수강 취소가 완료되었습니다. 👋"}
    finally:
        conn.close()

if __name__ == "__main__":
    import uvicorn
    # 서버 실행 (포트 8000)
    uvicorn.run(app, host="0.0.0.0", port=8000)

ㄴ