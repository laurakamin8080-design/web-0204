import pymysql

def check_db():
    try:
        conn = pymysql.connect(
            host='localhost',
            user='root',
            password='1234',
            db='school_system',
            charset='utf8mb4',
            cursorclass=pymysql.cursors.DictCursor
        )
        with conn.cursor() as cur:
            print("--- Courses ---")
            cur.execute("SELECT * FROM courses")
            for row in cur.fetchall():
                print(row)
            print("--- Enrollments ---")
            cur.execute("SELECT * FROM enrollments")
            for row in cur.fetchall():
                print(row)
        conn.close()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    check_db()
